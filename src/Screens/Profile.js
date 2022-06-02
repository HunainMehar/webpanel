import React, { useEffect } from "react";
import axios from "axios";
import Test from "./PostModal";
import jwtDecode from "jwt-decode";
import useState from "react-usestateref";
function truncate(string, n) {
  return string?.length > n ? string.substr(0, n - 1) + " ..." : string;
}
const token = localStorage.getItem("token");
let decodedToken;
if (token) {
  decodedToken = jwtDecode(token);
}
function Profile(props) {
  const [designs, setDesigns, designsRef] = useState([]);
  const [profileState, setProfileState] = useState(false);
  const [post, setPost, postRef] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [followerlength, setFollowerlength] = useState(
    decodedToken["followers"]
  );
  const [profilepicture, setProfilepicture] = useState(
    decodedToken["profilepicture"]
  );
  const [postlength, setPostlength] = useState(decodedToken["posts"]);
  const [name, setName] = useState(
    decodedToken["firstname"] + " " + decodedToken["lastname"]
  );

  const getState = (data) => {
    setProfileState(data);
  };

  const getPostData = async () => {
    await axios
      .get(
        "http://backend-fashionhub.herokuapp.com/designer/getpost/" +
          currentPost,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setProfileState(true);
  };

  //create a function to get designer details
  const getDesignerDetails = async () => {
    await axios
      .get(
        "http://backend-fashionhub.herokuapp.com/designer/getdesignerdetails/",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFollowerlength(response.data.followers);
        setPostlength(response.data.posts);
        setName(response.data.firstname + " " + response.data.lastname);
        setProfilepicture(response.data.profilepic);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(async () => {
    await getDesignerDetails();
  }, []);

  //create a function to get posts
  const getPosts = async () => {
    try {
      const response = await axios.get(
        "http://backend-fashionhub.herokuapp.com/designer/getposts",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setDesigns(response.data?.filter((item) => item._id !== null));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    await getPosts();
  }, []);
  const profileDetails = () => {
    return <Test showModal={getState} data={postRef.current} />;
  };
  return (
    <>
      {profileState && profileDetails()}
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-grey-900">Profile</h1>
          </div>
        </header>
        <main className="bg-gray-100 bg-opacity-25">
          <div className="lg:w-8/12 lg:mx-auto mb-8">
            <header className="flex flex-wrap items-center p-4 md:py-8">
              <div className="md:w-3/12 md:ml-16">
                {/* profile image */}
                <img
                  className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1"
                  src={
                    profilepicture
                      ? profilepicture
                      : "https://st2.depositphotos.com/47577860/45635/v/950/depositphotos_456355278-stock-illustration-users-dots-profile-account-loading.jpg?forcejpeg=true"
                  }
                  alt="profile"
                />
              </div>
              {/* profile meta */}
              <div className="w-8/12 md:w-7/12 ml-4">
                <div className="md:flex md:flex-wrap md:items-center mb-4">
                  <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                    {name}
                  </h2>
                  {/* badge */}
                  <span
                    className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2"
                    aria-hidden="true"
                  >
                    <i
                      className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"
                    />
                  </span>
                </div>
                {/* post, following, followers list for medium screens */}
                <ul className="hidden md:flex space-x-8 mb-4">
                  <li>
                    <span className="font-semibold">{postlength} </span>
                    posts
                  </li>
                  <li>
                    <span className="font-semibold">{followerlength} </span>
                    followers
                  </li>
                </ul>
              </div>
            </header>
            {/* posts */}
            <div className="px-px">
              <ul
                className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t"
              >
                <li className="border-t border-gray-700 p-3 text-gray-700">
                  post
                </li>
              </ul>
              {/* flexbox grid */}
              <div className="grid grid-cols-3 gap-3">
                {designsRef.current.map((design) => {
                  return <Card post={design} />;
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <div className="opacity-50 fixed inset-0 z-40 bg-black"></div> */}
    </>
  );

  function Card(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const deletePost = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3001/designer/deletepost/${id}`,
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        alert("Post deleted successfully");
      } catch (error) {
        console.log(error);
      }
    };

    const editPost = async (id) => {
      try {
        const response = await axios.put(
          `http://localhost:3001/designer/editpost`,
          {
            id: id,
            title: name,
            price: price,
            description: description,
          },
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        alert("Post edited successfully");
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <div
          className="h-[90%] w-full p-px "
          onClick={() => {
            setCurrentPost(props.post._id);
          }}
        >
          {/* post 1 */}
          <a
            className="cursor-pointer"
            onClick={async () => {
              await getPostData();
            }}
          >
            <article className=" border-2 bg-white text-grey-500">
              {/* post image*/}
              <div className="flex h-72 items-center justify-center ">
                <img
                  className="self-center h-64 w-64 object-contain"
                  src={props.post.image}
                  alt="River"
                />
              </div>
              <div className="px-8 font-bold text-xl mb-1">
                {props.post.title}
              </div>
              <p className="px-8 text-left text-gray-700">
                {truncate(props.post.description, 28)}
              </p>
              <div className=" flex py-4 justify-evenly">
                <span className="flex flex-row border-2 rounded-full px-3 py-1 text-md font-semibold text-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 self-center mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {props.post.price}
                </span>
                <span className="border-2 flex flex-row rounded-full px-3 py-1 text-md font-semibold text-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 self-center mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {props.post.likes.length}
                </span>
                <span className=" border-2 flex flex-row rounded-full px-3 py-1 text-md font-semibold text-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 self-center mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {props.post.comments.length}
                </span>
              </div>
            </article>
          </a>
        </div>
      </div>
    );
  }
}

export default Profile;
