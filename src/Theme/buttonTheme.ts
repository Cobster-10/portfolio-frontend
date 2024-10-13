import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brandPrimary = defineStyle({
  background: 'yellow.500',
  color: 'white',
  

  // let's also provide dark mode alternatives
  _dark: {
    background: 'yellow.800',
    color: 'white',
  },

  _hover:{
     bgColor: "yellow.700" }
})

export const buttonTheme = defineStyleConfig({
  variants: { brandPrimary },
})

