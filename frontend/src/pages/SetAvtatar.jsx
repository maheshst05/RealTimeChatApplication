import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    async function checkCurrentUser() {
      if (!localStorage.getItem("chat-app-current-user")) {
        navigate("/login");
      }else{
       // alert("Please")
      }
    }
    checkCurrentUser();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("chat-app-current-user"));

        const { data } = await axios.patch(
          `http://localhost:9090/user/update/${user._id}`,
          {
            image: avatars[selectedAvatar],
          }
        );

        if (data.isSet) {
          //  alert('ok')
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-current-user", JSON.stringify(user));
          navigate("/chat");
          //alert("okkk")
        } else {
          toast.error(
            "Error setting avatar. Please try again.",
            toastOptions
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchAvatars() {
      const data = [];
      try {
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        toast.error("Error loading avatars. Please try again.", toastOptions);
      }
    }
    fetchAvatars();
  }, [api]);

  return (
    <Container>
      {isLoading ? (
        <img src="https://i.gifer.com/ZKZg.gif" alt="loader" className="loader" />
      ) : (
        <>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                key={index}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;