// theme.js
import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './buttonTheme' // Assuming the path is correct

export const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
})
