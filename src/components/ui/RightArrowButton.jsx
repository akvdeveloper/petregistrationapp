"use client";

const RightArrowButton = ({ onClick }) => {
    return (
        <div>
            <button
                onClick={onClick} // Call the onClick function passed as a prop
                className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center shadow hover:bg-gray-600 focus:outline-none"
            >
                <img 
                    src="/img/icons/right-arrow.png" 
                    alt="Right Arrow" 
                    className="w-10 h-10" // Adjust these values for larger size
                />
            </button>
        </div>
    );
};

export default RightArrowButton;
