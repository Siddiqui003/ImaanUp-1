import React, { useState, useEffect,useCallback } from "react";
import Modal from "react-modal";
import Spinner from "../Spinner/Spinner";
import './Quran.css';
import Navbar from "../Navbar";


const apiKey = "AIzaSyCT5475G-8owc3ZHu0ciRYGupY7rvs3rZo"; // Replace with your actual YouTube API key


// Qaari map with display name and playlist IDs
const qariMap = {
  mishary: { displayName: "Mishary Rashid Alafasy", playlistId: "PLoqNzfHlA__knCeUoKUHjQfZpUL6mj64w" },
  saad: { displayName: "Saad Al-Ghamdi", playlistId: "PLhM2xiAUdw2cAqW_o3zZkbhJNw0bnaBZN" },
  sudais: { displayName: "Imam Sudais" , playlistId: "PLwGJCASZfx4OKFE2TjvBhiNKUyfLa8f6B"},
  maher: { displayName: "Maher Al-Muaiqly", playlistId: "PL96519CC4BF5DD993"}
};

const QuranComponent = () => {
  const [videoList, setVideoList] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedQari, setSelectedQari] = useState("mishary"); // Default Qaari selection
  const itemsPerPage = 12;

  

  // Fetch videos for the selected Qaari's playlist
  const fetchVideos = useCallback(async (playlistId) => {
    setIsLoading(true);
    let allVideos = [];
    let nextPageToken = '';
  
    try {
      do {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken}&key=${apiKey}`
        );
        const data = await response.json();
  
        allVideos = [...allVideos, ...data.items];
        nextPageToken = data.nextPageToken || '';
      } while (nextPageToken);
  
      // Apply search term filter if there's a search term
      const filteredVideos = searchTerm
        ? allVideos.filter(video =>
            video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : allVideos;
  
      setVideoList(allVideos);
      setFilteredVideos(filteredVideos);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  },[searchTerm])

  useEffect(() => {
    fetchVideos(qariMap[selectedQari].playlistId);
  }, [selectedQari,searchTerm,fetchVideos]);
  

  // Handle Qaari selection change
  const handleQariChange = (e) => {
    setSelectedQari(e.target.value);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredVideos(videoList);
      setCurrentPage(1);
    } else {
      const matchedVideos = videoList.filter(video =>
        video.snippet.title.toLowerCase().includes(term)
      );
      setFilteredVideos(matchedVideos);
      setCurrentPage(1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredVideos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Open modal and set current video id
    const openModal = (videoId) => {
      setCurrentVideoId(videoId);
      setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
      setIsModalOpen(false);
      setCurrentVideoId(null);
    };


  return (
    <div>
      <Navbar/>
    <div className="quran-container">
      <h1 className="quran-header">Quranic Audios - { qariMap[selectedQari].displayName }

      <select className="qari-dropdown" value={selectedQari} onChange={handleQariChange}>
      {Object.keys(qariMap).map((qariKey) => (
        <option key={qariKey} value={qariKey}>
          {qariMap[qariKey].displayName}
        </option>
      ))}
    </select>
    </h1>

        <input
          type="text"
          className="search-box"
          placeholder="Search Surah..."
          value={searchTerm}
          onChange={handleSearch}
        />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="video-thumbnails">
            {currentItems.map((video, index) => (
              <div
                key={index}
                className="video-thumbnail"
                onClick={() => openModal(video.snippet.resourceId.videoId)}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="thumbnail-image"
                />
                <p>{video.snippet.title}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                className={`page-button ${index + 1 === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Video Player"
        className="video-modal"
      >
        <div className="modal-content">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button className="close-button" onClick={closeModal}>&times;</button>
        </div>
      </Modal>
    </div>
    </div>
  );
};

export default QuranComponent;
