import React, { useEffect } from "react";
import useState from "react-usestateref";
import Modal from "react-modal";
import axios from "axios";

import SellerTopHeader from "./SellerTopHeader";
import jwtDecode from "jwt-decode";
const token = localStorage.getItem("token");
let decodedToken;
if (token) {
  decodedToken = jwtDecode(token);
}
function Profile(props) {
  const [designs, setDesigns, designsRef] = useState([]);

  //create a function to get posts
  const getPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/designer/getposts",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setDesigns(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  };
  useEffect(async () => {
    await getPosts();
  }, []);

  return (
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
                src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                alt="profile"
              />
            </div>
            {/* profile meta */}
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {decodedToken["firstname"] + " " + decodedToken["lastname"]}
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
                  <span className="font-semibold">
                    {decodedToken["posts"]}{" "}
                  </span>
                  posts
                </li>
                <li>
                  <span className="font-semibold">
                    {decodedToken["followers"]}{" "}
                  </span>
                  followers
                </li>
                <li>
                  <span className="font-semibold">4.8 </span>
                  rating
                </li>
              </ul>
              {/* user meta form medium screens */}
              {/* <div className="hidden md:block">
                <h1 className="font-semibold">HunainMehar...</h1>
                <span>Travel, Nature and Music</span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div> */}
            </div>
            {/* user meta form small screens */}
            {/* <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">HunainMehar...</h1>
              <span>Travel, Nature and Music</span>
              <p>If you know, you know</p>
            </div> */}
          </header>
          {/* posts */}
          <div className="px-px md:px-3">
            {/* user following for mobile only */}
            <ul
              className="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>
                <span className="font-semibold text-gray-800 block">136</span>
                posts
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">40.5k</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">4.8</span>
                rating
              </li>
            </ul>
            {/* insta freatures */}
            <ul
              className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t"
            >
              {/* posts tab is active */}
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs" />
                  <span className="hidden md:inline">post</span>
                </a>
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
        <div className=" p-px md:px-3">
          {/* post 1 */}
          <a href="#" onClick={() => setModalIsOpen(true)}>
            <article className="post border-2 bg-white text-grey-500 relative pb-full md:mb-6">
              {/* post image*/}
              <img
                className="self-center 	aspect-ratio: 1 / 1"
                src={props.post.image}
                alt="River"
                resize="contain"
              />
              <div className="px-2 font-bold text-xl mb-2">
                {props.post.title}
              </div>
              <p className="px-2 text-gray-700 text-base">
                {props.post.description}
              </p>
              <div className=" flex px-6 pt-6 justify-evenly">
                <span className=" bg-gray-200   rounded-full px-3 py-1 text-md font-semibold text-gray-700 mb-2">
                  {props.post.price}
                </span>
                <span className="bg-gray-200 flex flex-row rounded-full px-3 py-1 text-md font-semibold text-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 self-center"
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
                <span className="bg-gray-200  flex flex-row rounded-full px-3 py-1 text-md font-semibold text-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 self-center"
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

        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <h1 className="font-medium text-3xl">{props.post.title}</h1>

          <form>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Design"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Price"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  await editPost(props.post._id);
                }}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="delete"
                onClick={async (e) => {
                  e.preventDefault();
                  await deletePost(props.post._id);
                }}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
              {/* Secondary */}
              <button
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Profile;
