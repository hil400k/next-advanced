import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>
          React Meetups
        </title>
        <meta name="description" content="Browse a huge list..." />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}

// should be used for data that is updated frequently
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// called during build process

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://hil400k:p9355wKH@cluster0.aixzlce.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  }
}

export default HomePage;
