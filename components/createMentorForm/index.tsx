import { useRef } from 'react';
import * as Yup from 'yup';
import 'yup-phone';
import { Formik, Form, Field } from 'formik';
import {
  VStack,
  FormControl,
  Text,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';

import { FormikValues, FormikErrors } from 'formik';

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
  location: Yup.string(),
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
        location: '',
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
        const newProgress = calcProgress(values, errors);
        if (progressRef.current !== newProgress) {
          onProgressChange(newProgress);
          progressRef.current = newProgress;
        }

        return (
          <Form onSubmit={handleSubmit} noValidate>
            <VStack spacing={{ base: 8, lg: 8 }} alignItems='start'>
              <Text fontSize='lg' fontWeight={500} color='blackAlpha.600'>
                1. Personal Information
              </Text>
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
              {/*TODO add gender*/}

              <Text
                fontSize='lg'
                fontWeight={500}
                color='blackAlpha.600'
                pt={8}
              >
                2. Contact Information
              </Text>
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

              <FormControl isInvalid={!!errors.location && touched.location}>
                <FormLabel htmlFor='location' fontSize='sm' mb={1}>
                  Location
                </FormLabel>
                <Field
                  as={Input}
                  id='location'
                  name='location'
                  type='text'
                  placeholder='Where are you?'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              </FormControl>

              {/*  TODO: Convert to select */}
              <FormControl
                isRequired
                isInvalid={!!errors.timeZone && touched.timeZone}
              >
                <FormLabel htmlFor='timeZone' fontSize='sm' mb={1}>
                  Time zone
                </FormLabel>
                <Field
                  as={Input}
                  id='timeZone'
                  name='timeZone'
                  type='text'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.timeZone}</FormErrorMessage>
              </FormControl>

              <Text
                fontSize='lg'
                fontWeight={500}
                color='blackAlpha.600'
                pt={8}
              >
                3. Experience
              </Text>
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

              {/*TODO add certification toggles*/}

              {/*TODO add dropdown menu for years of experience*/}

              <Text fontSize='lg' mb={5}>
                Mentee Preferences
              </Text>

              {/*TODO add toggle for "Open to Multiple Mentor/mentees*/}

              {/*TODO add dropdown menu for gender preference of mentor*/}

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
