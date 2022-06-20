import DefaultLayout from '../components/layouts/default';
import Filter from '../components/Filter/Filter';
import EventList from '../components/EventList/EventList';


export default function Home() {
    return (
      <DefaultLayout>
          <div className="container">
              <Filter/>

              <EventList/>
          </div>
      </DefaultLayout>
  )
}
