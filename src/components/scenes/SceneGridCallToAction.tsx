import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'

const SceneGridCallToAction = () => {
  return (
    <Box as="section" bg="bg.surface">
    <Container py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '8', md: '10' }}>
        <Stack spacing={{ base: '4', md: '5' }} align="center">
          <Heading size={{ base: 'sm', md: 'md' }}>Scenes to edit for the selected Adventure</Heading>
          <Text color="fg.muted" maxW="2xl" textAlign="center" fontSize="xl">
            In order to get a list of scenes for an Adventure to edit, please select an adventure first.
          </Text>
        </Stack>
      </Stack>
    </Container>
  </Box>
  )
}

export default SceneGridCallToAction