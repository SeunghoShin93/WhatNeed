import React, { Component } from "react";
import { UserMediaError, withUserMedia  } from '@vardius/react-user-media';

function UserMedia({userMedia}) {
  const { stream, error } = userMedia;

  if (error) {
    return (
      <UserMediaError error={error} />
    );
  }

  return (
    <video autoPlay ref={video => { video.srcObject = stream }} />
  );
}


export default withUserMedia(UserMedia);