import { FaVolumeLow } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaCompress } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { FaDesktop } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IoPlayCircleSharp } from "react-icons/io5";
import './Footer.css';

import React from 'react'

function Footer() {
  return (
    <div className="footer">
        <div className="song-bar">
            <div className="song-info">
                <div className="song-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qDSv6HAC1fG8PCCaqdQ-yhibNtMxHqGUmQ&s" alt="song image" />
                </div>
                <div className="song-description">
                   <p className="title">
                            Watashitachi wa Sou Yatte Ikite Iku Jinshu na no
                        </p>
                   <p className="artist">Masaru Yokoyama</p>
                </div>
            </div>
            <div className="song-actions">
                <CiHeart />
                <FaCompress />
            </div>
        </div>
        <div className="progress-bar">
            <div className="progress-control">
                <FaShuffle />
                <FaStepBackward />
                <IoPlayCircleSharp className="play-pause" />
                <FaStepForward />
                <IoMdRefresh />
            </div>
            <div className="progress-show">
                   <span>0:49</span>
                    <div class="progress-handle">
                        <div class="progress"></div>
                    </div>
                    <span>3:15</span>
            </div>
        </div>
        <div className="controllers">
            <FiList />
            <FaDesktop />
            <div className="volume-bar">
                <FaVolumeLow />
                <input type="range" min="0" max="100" />
            </div>
        </div>

    </div>
  )
}

export default Footer