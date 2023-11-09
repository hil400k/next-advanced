import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>
          {props.meetupData.title}
        </title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://hil400k:p9355wKH@cluster0.aixzlce.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    }))
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://hil400k:p9355wKH@cluster0.aixzlce.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId)
  })

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address
      }
    }
  }
}

export default MeetupDetails;
