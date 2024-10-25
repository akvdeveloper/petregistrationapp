import Image from 'next/image';

const SelectionButton = ({ label, imageSrc, onClick, isSelected }) => {
    return (
        <button
            type="button" // Ensure this is set to prevent default form submission
            className={`bg-gray-300 rounded-lg p-4 flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 active:scale-95 ${isSelected ? 'bg-green-500' : ''}`} 
            onClick={(e) => {
                e.preventDefault(); // Prevent any default behavior
                onClick(); // Trigger the onClick event
            }}
            aria-pressed={isSelected} // Accessibility: Indicate if the button is selected
        >
            <Image 
                src={imageSrc} 
                alt={label} 
                width={64} 
                height={64} 
                className="mb-2" 
            />
            <span className="text-gray-900 text-lg md:text-xl font-bold">
                {label}
            </span>
        </button>
    );
};

export default SelectionButton;
