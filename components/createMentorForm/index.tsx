import { useRef } from 'react';
import * as Yup from 'yup';
import 'yup-phone';
import { Formik, Form, Field } from 'formik';
import {
  VStack,
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import countries from 'world_countries_lists/data/countries/en/countries.json';
import { timeZonesNames } from '@vvo/tzdb';

import type { FormikValues, FormikErrors } from 'formik';

const countriesOptions = countries.map(c => c.name);
const timeZoneOptions = timeZonesNames.map(name => name.replace('_', ' '));

const RegistrantSchema = Yup.object().shape({
  firstName: Yup.string().required('Field is required'),
  lastName: Yup.string().required('Field is required'),
  gender: Yup.string().required('Field is required'),
  email: Yup.string().email('Invalid email').required('Field is required'),
  phoneNumber: Yup.lazy(value =>
    !value
      ? Yup.string()
      : Yup.string().phone(undefined, undefined, 'Invalid phone number')
  ),
  timeZone: Yup.string().required('Field is required'),
  country: Yup.string(),
  yearsOfExperience: Yup.number().required('Field is required'),
  companyName: Yup.string(),
  jobTitle: Yup.string(),
  certifications: Yup.array().of(Yup.string()),
  skills: Yup.array().of(Yup.string()),
  isOpenToMultiple: Yup.boolean().required('Field is required'),
  genderPreference: Yup.string().required('Field is required'),
});

const calcProgress = (
  values: FormikValues,
  errors: FormikErrors<any>
): number => {
  const totalFields = Object.keys(values).length;
  const validFields = Object.keys(values).filter(
    field => !errors[field]
  ).length;

  return Math.floor((validFields / totalFields) * 100);
};

type Props = {
  onProgressChange: Function;
  onSubmit: Function;
};

const RegisterEventForm = ({ onProgressChange, onSubmit }: Props) => {
  const progressRef = useRef(0);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        timeZone: '',
        country: '',
        yearsOfExperience: null,
        companyName: '',
        jobTitle: '',
        certifications: [],
        skills: [],
        isOpenToMultiple: false,
        genderPreference: '',
      }}
      onSubmit={values =>
        // TODO: Handle submission processing
        onSubmit(values)
      }
      validationSchema={RegistrantSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        console.log(values);
        const newProgress = calcProgress(values, errors);
        if (progressRef.current !== newProgress) {
          onProgressChange(newProgress);
          progressRef.current = newProgress;
        }

        return (
          <Form onSubmit={handleSubmit} noValidate>
            <VStack spacing={{ base: 8, lg: 8 }} alignItems='start'>
              {/*  PERSONAL INFORMATION SECTION */}
              <Text fontSize='lg' fontWeight={500} color='blackAlpha.600'>
                1. Personal Information
              </Text>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl
                  isRequired
                  isInvalid={!!errors.firstName && touched.firstName}
                >
                  <FormLabel htmlFor='firstName' fontSize='sm' mb={1}>
                    First name
                  </FormLabel>
                  <Field
                    as={Input}
                    id='firstName'
                    name='firstName'
                    type='text'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!errors.lastName && touched.lastName}
                >
                  <FormLabel htmlFor='lastName' fontSize='sm' mb={1}>
                    Last name
                  </FormLabel>
                  <Field
                    as={Input}
                    id='lastName'
                    name='lastName'
                    type='text'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <FormControl
                isRequired
                isInvalid={!!errors.gender && touched.gender}
              >
                <Flex mt={2}>
                  <FormLabel
                    htmlFor='gender'
                    fontSize='sm'
                    mt={2}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Gender
                  </FormLabel>
                  <Box w='full'>
                    <Field
                      as={Select}
                      id='gender'
                      name='gender'
                      placeholder='Select option'
                      fontSize='sm'
                    >
                      <option value='male'>Male</option>
                      <option value='female'>Female </option>
                      <option value='other'>Other </option>
                    </Field>
                    <FormErrorMessage>{errors.gender}</FormErrorMessage>
                  </Box>
                </Flex>
              </FormControl>

              {/*  CONTACT INFORMATION SECTION */}
              <Text
                fontSize='lg'
                fontWeight={500}
                color='blackAlpha.600'
                pt={8}
              >
                2. Contact Information
              </Text>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl
                  isRequired
                  isInvalid={!!errors.email && touched.email}
                >
                  <FormLabel htmlFor='email' fontSize='sm' mb={1}>
                    Email
                  </FormLabel>
                  <Field
                    as={Input}
                    id='email'
                    name='email'
                    type='text'
                    placeholder='human@email.com'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                >
                  <FormLabel htmlFor='phoneNumber' fontSize='sm' mb={1}>
                    Phone number
                  </FormLabel>
                  <Field
                    as={Input}
                    id='phoneNumber'
                    name='phoneNumber'
                    type='tel'
                    placeholder='(123) 456-7890'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl isInvalid={!!errors.country && touched.country}>
                  <FormLabel htmlFor='country' fontSize='sm' mb={1}>
                    Country
                  </FormLabel>
                  <Field
                    as={Select}
                    id='country'
                    name='country'
                    placeholder='Where are you?'
                    fontSize='sm'
                  >
                    {countriesOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{errors.country}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!errors.timeZone && touched.timeZone}
                >
                  <FormLabel htmlFor='timeZone' fontSize='sm' mb={1}>
                    Time zone
                  </FormLabel>
                  <Field
                    as={Select}
                    id='timeZone'
                    name='timeZone'
                    placeholder='What time is it?'
                    fontSize='sm'
                  >
                    {timeZoneOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{errors.timeZone}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              {/* EXPERIENCE SECTION */}
              <Text
                fontSize='lg'
                fontWeight={500}
                color='blackAlpha.600'
                pt={8}
              >
                3. Experience
              </Text>
              <SimpleGrid
                w='full'
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 8, lg: 4 }}
              >
                <FormControl
                  isInvalid={!!errors.companyName && touched.companyName}
                >
                  <FormLabel htmlFor='companyName' fontSize='sm' mb={1}>
                    Company name
                  </FormLabel>
                  <Field
                    as={Input}
                    id='companyName'
                    name='companyName'
                    type='text'
                    placeholder='Work, Inc.'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.companyName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.jobTitle && touched.jobTitle}>
                  <FormLabel htmlFor='jobTitle' fontSize='sm' mb={1}>
                    Job Title
                  </FormLabel>
                  <Field
                    as={Input}
                    id='jobTitle'
                    name='jobTitle'
                    type='text'
                    placeholder='What do you do?'
                    fontSize='sm'
                  />
                  <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              {/*certification toggles*/}
              <Text fontSize='md' mb={5}>
                {' '}
                Certifications{' '}
              </Text>

              <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
                <FormLabel htmlFor='cpa' mb='0'>
                  {' '}
                  CPA{' '}
                </FormLabel>
                <Switch id='cpa' />

                <FormLabel htmlFor='cpa' mb='0'>
                  {' '}
                  CIA{' '}
                </FormLabel>
                <Switch id='cia' />

                <FormLabel htmlFor='cisa' mb='0'>
                  {' '}
                  CISA{' '}
                </FormLabel>
                <Switch id='cisa' />

                <FormLabel htmlFor='pmp' mb='0'>
                  {' '}
                  PMP{' '}
                </FormLabel>
                <Switch id='pmp' />

                <FormLabel htmlFor='cfe' mb='0'>
                  {' '}
                  CFE{' '}
                </FormLabel>
                <Switch id='cfe' />

                <FormLabel htmlFor='crma' mb='0'>
                  {' '}
                  CRMA{' '}
                </FormLabel>
                <Switch id='crma' />
              </FormControl>

              {/* Number Input: Years of Experience*/}
              <FormControl isRequired display='flex' alignItems='center'>
                <FormLabel htmlFor='yearsOfExperience' mb='0'>
                  {' '}
                  Years of Experience{' '}
                </FormLabel>
                <NumberInput defaultValue={15} min={0} max={50}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Text fontSize='lg' mb={5}>
                Mentee Preferences
              </Text>

              {/* Toggle: Open to multiple mentees*/}
              <FormControl isRequired display='flex' alignItems='center'>
                <FormLabel htmlFor='multiple-mentors' mb='0'>
                  Open to multiple mentees?
                </FormLabel>
                <Switch id='multiple-mentors' />
              </FormControl>

              {/* Select: gender preference of mentee*/}
              <FormControl isRequired display='flex' alignItems='center'>
                <FormLabel htmlFor='multiple-mentors' mb='0'>
                  {' '}
                  Gender preference of mentee?{' '}
                </FormLabel>
                <Select placeholder='Select option'>
                  <option value='noPreference'>No preference</option>
                  <option value='female'>Female Only </option>
                  <option value='male'> Male Only </option>
                </Select>
              </FormControl>

              {/*TODO add type box with fuzzy logic to type in skills*/}

              <Button type='submit' colorScheme='pennBlue'>
                Submit application
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterEventForm;
