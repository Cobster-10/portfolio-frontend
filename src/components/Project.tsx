import { Flex } from '@chakra-ui/react'
import React from 'react'
import ProjectDescription from './ProjectDescription'
import ProjectImage from './ProjectImage'

interface ProjectProps {
  data: any;
}

const Project = ({data}: ProjectProps) => {
  return (
    <Flex justifyContent={"space-evenly"} >
        <ProjectImage data={data}/>
        <ProjectDescription data={data} />
    </Flex>
  )
}

export default Project