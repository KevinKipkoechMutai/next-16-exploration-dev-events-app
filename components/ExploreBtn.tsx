"use client"

import Image from "next/image"

const ExploreBtn = () => {
  return (
    <button className="mt-7 mx-auto" id="explore-btn" type="button" onClick={() => console.log("Explore Events")}>
      <a href="#events">
          Explore Events
          <Image 
            src="/icons/arrow-down.svg"
            alt="explore events"
            width={24}
            height={24}
          />
      </a>
    </button>
  )
}

export default ExploreBtn