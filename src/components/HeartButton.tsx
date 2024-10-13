import { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import heart from '../assets/heart (2).png'; // Replace with the correct path to your heart image

function HeartButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000); // Reset after 1 second
  };

  return (
    <Box
      as='button'
      boxSize="4rem"
      border="1px"
      position="relative"
      onClick={handleClick}
      transition="transform 0.3s ease-in-out"
      
      style={{ transform: clicked ? 'rotate(360deg)' : 'none' }}
    >
      <Image transition="transform 0.3s ease-in-out" _hover={{transform:"translateY(-10px)"}} src={heart} objectFit="contain" boxSize="100%" />
    </Box>
  );
}

export default HeartButton;
