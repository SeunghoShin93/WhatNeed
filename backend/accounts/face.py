import argparse
import face_recognition as fr
import os
import pickle
import time
import json
import glob
import numpy as np
import cv2
from PIL import Image
import pymysql

postfix_list = ["%03d"%time for time in range(0,1000)]

def postfix_generator():
    cnt = 0
    while True:
        cnt += 1
        if cnt >= len(postfix_list):
            cnt = 0
        yield postfix_list[cnt]

postfix_gen = postfix_generator()

def face_count(img_path):
    img = fr.load_image_file(img_path)
    face_images = fr.face_encodings(img)
    return len(face_images)

def face_encoding_update(img_path, user_id, encoding_dict ,encoding_path = "encoding"):

    if not os.path.exists(encoding_path):
        os.mkdir(encoding_path)
    img = fr.load_image_file(img_path)
    face_encoding = fr.face_encodings(img)[0]
    pre_face_encoding = encoding_dict[user_id]
    face_encoding = 0.7*pre_face_encoding + 0.3*face_encoding
    encoding_dict[user_id] = face_encoding
    
    file_name = user_id +".json"
    file_path = os.path.join(encoding_path, file_name)
    file_data = {}
    file_data['id'] = user_id
    file_data['face_encoding'] = face_encoding
    with open(file_path, 'w', encoding="utf-8") as file:
        json.dump(file_data, file, indent='\t' )
    return encoding_dict

def face_save(img_path, encoding_path = "encoding"):


    if not os.path.exists(encoding_path):
        os.mkdir(encoding_path)
    img = fr.load_image_file(img_path)
    face_encoding = fr.face_encodings(img)[0]

    file_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + next(postfix_gen)
    file_name = file_id +".json"
    file_data = {}
    file_data['id'] = file_id
    file_data['face_encoding'] = face_encoding.tolist()
    file_path = os.path.join(encoding_path, file_name)
    with open(file_path, 'w', encoding="utf-8") as file:
        json.dump(file_data, file, indent='\t' )
    return file_id,  file_name

def face_webcam_save(img_cnt = 20, encoding_path = "encoding"):
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = False
    video_capture = cv2.VideoCapture(0)
    cnt = 0
    while True:
        if cnt >= img_cnt:
            break
        process_this_frame = not process_this_frame
        
        ret, frame = video_capture.read()
        rgb_small_frame = frame[:, :, ::-1]
        if process_this_frame:
            face_locations = fr.face_locations(rgb_small_frame)
            face_encodings = fr.face_encodings(rgb_small_frame, face_locations)
            if len(face_encodings) == 0:
                continue
            cnt += 1
            img = Image.fromarray(rgb_small_frame)
            file_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + next(postfix_gen)
            img.save(file_id + ".jpg")
            
        cv2.imshow('Video', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    video_capture.release()
    cv2.destroyAllWindows()

    if not os.path.exists(encoding_path):
        os.mkdir(encoding_path)
    img_path_list = glob.glob("*.jpg")
    face_encoding_list = []
    for img_path in img_path_list:
        img = fr.load_image_file(img_path)
        tmp_encoding = fr.face_encodings(img)
        if len(tmp_encoding) != 0:
            face_encoding_list.append(fr.face_encodings(img)[0])
    face_encoding = np.mean(face_encoding_list, axis=0)    
    file_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + next(postfix_gen)
    file_name = file_id +".json"
    file_data = {}
    file_data['id'] = file_id
    file_data['face_encoding'] = face_encoding.tolist()
    file_path = os.path.join(encoding_path, file_name)
    with open(file_path, 'w', encoding="utf-8") as file:
        json.dump(file_data, file, indent='\t' )
    return file_id,  file_name

encoding_dict = {}

def load_list(encoding_path = "encoding"):
    encoding_path_list = glob.glob(os.path.join(encoding_path,"*.json"))
    ret = {}
    for encoding_path in encoding_path_list:
        tmp_dict = {}
        with open(encoding_path, 'r', encoding='utf-8') as file:
            tmp_dict = json.load(file)
            tmp_dict['face_encoding'] = np.array(tmp_dict['face_encoding'])
            ret[tmp_dict['id']] = tmp_dict['face_encoding']
    return ret

def face_detect(img_path, encoding_dict ,  tolerance = 0.6):
    target_img = fr.load_image_file(img_path)
    target_img_encoding = fr.face_encodings(target_img)[0]
    encoding_list = []
    

    for face_id in encoding_dict:
        compare_encoding = encoding_dict[face_id]
        compare_encoding_dict = {}
        compare_encoding_dict['id'] = face_id
        compare_encoding_dict['dist'] = np.linalg.norm(compare_encoding- target_img_encoding)
        if compare_encoding_dict['dist'] <= tolerance:
            encoding_list.append(compare_encoding_dict)

    if len(encoding_list) == 0:
        return -1

    encoding_list = sorted(encoding_list, key=lambda dic: dic['dist'])
    ans = encoding_list[0]
    if ans['dist'] <= tolerance:
        return [encoding_data['id'] for encoding_data in encoding_list if encoding_data['dist'] <= tolerance ]  
    else:
        return -1

if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("--img_path", help="set image_path", type=str, default="")
    args = parser.parse_args()
    img_path = "./20200428041845002.jpg"
    encoding_dict_list = load_list(encoding_path="backend/encoding")
    res_list = face_detect(img_path, encoding_dict_list)
    
    connect = pymysql.connect(host = '52.79.161.164', user='root', password='ssafy', db = 'project', charset = 'utf8')
    cur = connect.cursor()
    sql = 'select * from user where id = %s'
    cur.execute(sql, res_list[0])
