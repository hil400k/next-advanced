import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import React from 'react';
import Head from 'next/head';

function NewMeetupPage() {
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
  }


  return (
    <>
      <Head>
        <title>
          Add a new meetup
        </title>
        <meta name="description" content="Add a new..." />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </>
  );
}

export default NewMeetupPage;
