import { useRef } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Text,
  Button, SimpleGrid,
} from '@chakra-ui/react';

import { FormikValues, FormikErrors } from 'formik';
import { Switch } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { Select } from '@chakra-ui/react';

const CreateMentorSchema = Yup.object().shape({
  eventName: Yup.string().required('Field is required'),
  closingDate: Yup.string().required('Field is required'),
  emails: Yup.string().required('Field is required'),
});

const calcProgress = (
  values: FormikValues,
  errors: FormikErrors<any>,
  hasValidEmail: boolean
): number => {
  const totalFields = Object.keys(values).length;
  const validFields = Object.keys(values).filter(
    field =>
      !errors[field] &&
      Boolean(values[field]) &&
      (field !== 'emails' || hasValidEmail)
  ).length;

  return Math.floor((validFields / totalFields) * 100);
};

const validateEmails = (emailsStr: string): string[] => {
  const potentialEmails = emailsStr.split(/[\s,]+/);
  return potentialEmails.filter(
    email => Boolean(email) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  );
};

type Props = {
  onProgressChange: Function;
  onSubmit: Function;
};

const CreateEventForm = ({ onProgressChange, onSubmit }: Props) => {
  const progressRef = useRef(0);

  return (
    <Formik
      initialValues={{
        eventName: '',
        closingDate: '',
        emails: '',
      }}
      onSubmit={values =>
        onSubmit({ ...values, emails: validateEmails(values.emails) })
      }
      validationSchema={CreateMentorSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        const validEmails = validateEmails(values.emails);
        const newProgress = calcProgress(
          values,
          errors,
          Boolean(validEmails.length)
        );

        if (progressRef.current !== newProgress) {
          onProgressChange(newProgress);
          progressRef.current = newProgress;
        }

        return (
          <Form onSubmit={handleSubmit} noValidate>
            <VStack spacing={{ base: 16, lg: 20 }}>
              <Text fontSize='lg' mb={5}>
                Personal Information
              </Text>

              <FormControl
                isRequired
                isInvalid={!!errors.eventName && touched.eventName}
              >
                <FormLabel htmlFor='firstName' fontSize='sm' mb={5}>
                  First Name
                </FormLabel>
                <Field
                  as={Input}
                  id='firstName'
                  name='firstName'
                  type='text'
                  placeholder='Enter first name'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors.eventName && touched.eventName}
              >
                <FormLabel htmlFor='lastName' fontSize='sm' mb={5}>
                  Last Name
                </FormLabel>
                <Field
                  as={Input}
                  id='lastName'
                  name='lastName'
                  type='text'
                  placeholder='Enter last name'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              {/*Select: gender*/}
              <FormControl isRequired display='flex' alignItems='center'>
                <FormLabel htmlFor='gender' mb='0'> Gender </FormLabel>
                <Select placeholder='Select option'>
                  <option value='male'>Male</option>
                  <option value='female'>Female </option>
                  <option value='other'>Other </option>
                </Select>
              </FormControl>


                <Text fontSize='lg' mb={5}>
                Contact Information
              </Text>

              <FormControl
                isRequired
                isInvalid={!!errors.eventName && touched.eventName}
              >
                <FormLabel htmlFor='email' fontSize='sm' mb={5}>
                  Email
                </FormLabel>
                <Field
                  as={Input}
                  id='email'
                  name='email'
                  type='text'
                  placeholder='Enter email address'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.eventName && touched.eventName}>
                <FormLabel htmlFor='phoneNumber' fontSize='sm' mb={5}>
                  Phone number
                </FormLabel>
                <Field
                  as={Input}
                  id='phoneNumber'
                  name='phoneNumber'
                  type='phone'
                  placeholder='Enter phone number'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.eventName && touched.eventName}>
                <FormLabel htmlFor='location' fontSize='sm' mb={5}>
                  Location
                </FormLabel>
                <Field
                  as={Input}
                  id='location'
                  name='location'
                  type='text'
                  placeholder='Enter location'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors.eventName && touched.eventName}
              >
                <FormLabel htmlFor='timeZone' fontSize='sm' mb={5}>
                  Time Zone
                </FormLabel>
                <Field
                  as={Input}
                  id='timeZone'
                  name='timeZone'
                  type='text'
                  placeholder='Enter timezone'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <Text fontSize='lg' mb={5}>
                Experience
              </Text>

              <FormControl
                isRequired
                isInvalid={!!errors.eventName && touched.eventName}
              >
                <FormLabel htmlFor='companyName' fontSize='sm' mb={5}>
                  Company Name
                </FormLabel>
                <Field
                  as={Input}
                  id='companyName'
                  name='companyName'
                  type='text'
                  placeholder='Enter company name'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors.eventName && touched.eventName}
              >
                <FormLabel htmlFor='jobTitle' fontSize='sm' mb={5}>
                  Job Title
                </FormLabel>
                <Field
                  as={Input}
                  id='jobTitle'
                  name='jobTitle'
                  type='text'
                  placeholder='Enter job title'
                  fontSize='sm'
                />
                <FormErrorMessage>{errors.closingDate}</FormErrorMessage>
              </FormControl>

              {/*certification toggles*/}
              <Text fontSize='md' mb={5}> Certifications </Text>

              <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
                <FormLabel htmlFor='cpa' mb='0'> CPA </FormLabel>
                <Switch id='cpa' />

                <FormLabel htmlFor='cpa' mb='0'> CIA </FormLabel>
                <Switch id='cia' />

                <FormLabel htmlFor='cisa' mb='0'> CISA </FormLabel>
                <Switch id='cisa' />

                <FormLabel htmlFor='pmp' mb='0'> PMP </FormLabel>
                <Switch id='pmp' />

                <FormLabel htmlFor='cfe' mb='0'> CFE </FormLabel>
                <Switch id='cfe' />

                <FormLabel htmlFor='crma' mb='0'> CRMA </FormLabel>
                <Switch id='crma' />

              </FormControl>

              {/* Number Input: Years of Experience*/}
              <FormControl isRequired display='flex' alignItems='center'>

              <FormLabel htmlFor='yearsOfExperience' mb='0'> Years of Experience </FormLabel>
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
                <FormLabel htmlFor='multiple-mentors' mb='0'> Gender preference of mentee? </FormLabel>
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

export default CreateEventForm; //TODO update
