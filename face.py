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

def face_save(img_path, encoding_path = "encoding"):
    #img_path에 있는 파일에서 얼굴을 인코딩을 한 후.
    #그 값을 저장한다.
    if not os.path.exists(encoding_path):
        os.mkdir(encoding_path)
    img = fr.load_image_file(img_path)
    face_encoding = fr.face_encodings(img)[0]
    #동시에 파일이 생성되면 꼬이기 때문에
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
        # Grab a single frame of video
        if cnt >= img_cnt:
            break
        process_this_frame = not process_this_frame
        
        ret, frame = video_capture.read()

        # Resize frame of video to 1/4 size for faster face recognition processing
        #small_frame = cv2.resize(frame, (0, 0))

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = frame[:, :, ::-1]

        # Only process every other frame of video to save time
        if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = fr.face_locations(rgb_small_frame)
            face_encodings = fr.face_encodings(rgb_small_frame, face_locations)
            if len(face_encodings) == 0:
                continue
            cnt += 1
            print(len(face_encodings))
            img = Image.fromarray(rgb_small_frame)
            file_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + next(postfix_gen)
            img.save(file_id + ".jpg")
            
        # Display the resulting image
        cv2.imshow('Video', frame)

        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release handle to the webcam
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

encoding_dict_list = []

def load_list(encoding_path = "encoding"):
    print("load files")
    encoding_path_list = glob.glob(os.path.join(encoding_path,"*.json"))
    for encoding_path in encoding_path_list:
        tmp_dict = {}
        with open(encoding_path, 'r', encoding='utf-8') as file:
            tmp_dict = json.load(file);
            tmp_dict['face_encoding'] = np.array(tmp_dict['face_encoding'])
            encoding_dict_list.append(tmp_dict)
    return encoding_dict_list

#여기서 다 읽어 오는가?
#아님 save를 하면서 리스트에 추가시키는가?
def face_detect(img_path, encoding_dict_list ,  tolerance = 0.6):
    target_img = fr.load_image_file(img_path)
    target_img_encoding = fr.face_encodings(target_img)[0]
    encoding_list = []
    
    #print(encoding_list)

    for compare_encoding_dict in encoding_dict_list:
        compare_encoding = compare_encoding_dict['face_encoding']
        #print(compare_encoding_dict['face_encoding'].shape)
        #print("add candidate")
        compare_encoding_dict['dist'] = np.linalg.norm(compare_encoding_dict['face_encoding']- target_img_encoding)
        if compare_encoding_dict['dist'] <= tolerance:
            #print(compare_encoding_dict['dist'])
            encoding_list.append(compare_encoding_dict)
        #encoding_id_list.append(compare_encoding_dict)
    
    #만약 전처리에서 나온 얼굴이 없을때 unknown을 리턴.
    if len(encoding_list) == 0:
        return -1

    encoding_list = sorted(encoding_list, key=lambda dic: dic['dist'])
    #print(encoding_list)
    #dis_list = fr.face_distance(encoding_list, target_img_encoding)
    #print(encoding_list)
    ans = encoding_list[0]
    #print(ans['dist'])
    if ans['dist'] <= tolerance:
        #return encoding_id_list[ans]
        return [encoding_data['id'] for encoding_data in encoding_list if encoding_data['dist'] <= tolerance ]  
    else:
        return -1

if __name__ == "__main__":
    #python face.py --img_path 1.jpg 로 사용하면 된다.
    parser = argparse.ArgumentParser()
    parser.add_argument("--img_path", help="set image_path", type=str, default="")
    args = parser.parse_args()
    img_path = args.img_path
    encoding_dict_list = load_list()
    res_list = face_detect(img_path, encoding_dict_list)
    print(res_list)
    
    connect = pymysql.connect(host = '52.79.161.164', user='root', password='ssafy', db = 'project', charset = 'utf8')
    cur = connect.cursor()
    sql = 'select * from user where id = %s'
    cur.execute(sql, res_list[0])
    print(cur.fetchall())
    

