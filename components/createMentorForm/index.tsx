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
  Button,
} from '@chakra-ui/react';

import { FormikValues, FormikErrors } from 'formik';

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

              {/*TODO add gender*/}

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
                  type='phone' //TODO check this type
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
                  type='text' //TODO check type
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

export default CreateEventForm; //TODO update
