import { Routes, Route } from 'react-router-dom'
import './App.css';
import RoomList from './admin/RoomList';
import BookingList from './admin/BookingList';
import RoomCatalog from './public/RoomCatalog';
import BookingEntryPoint from './public/BookingEntryPoint';
import NotFound from './NoFound'
import AdminDashboard from './admin/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import RoomSummary from './public/RoomSummary';
import MyLayout from './public/MyLayout'
import AdminLayout from './admin/AdminLayout';
import Welcome from './public/Welcome';
import BillingInfo from './public/BillingInfo';
import BookingResult from './public/BookingResult';
import Booking from './admin/Booking';
import Store from './contexts/Store';
import "react-datepicker/dist/react-datepicker.css";
import RoomDetails from './admin/RoomDetails';
import EditRoomInfo from './admin/EditRoomInfo';
import Signin from './admin/Signin';
import BookingError from './public/BookingError';
import Notice from './public/Notice';
import Aboutus from './public/Aboutus';
import Contactus from './public/Contactus';
import TermsConditions from './public/TermsConditions';
import RoomListPublic from './public/RoomListPublic';
import CancellationRefundPolicy from './public/CancellationRefundPolicy';
import AdminLayoutSettings from './admin/AdminLayoutSettings';
import GeneralSettings from './admin/GeneralSettings';
import Users from './admin/Users';
import Roles from './admin/Roles';
import TemplateRoomBookSuccess from './admin/TemplateRoomBookSuccess';
import TemplateRoomBookOnhold from './admin/TemplateRoomBookOnhold';
import TemplateRoomBookReceipt from './admin/TemplateRoomBookReceipt';
import BillingInfoAdmin from './admin/BillingInfoAdmin';
import RoomCatalogAdmin from './admin/RoomCatalogAdmin';
import AddNewRoom from './admin/AddNewRoom';
import BookingRetry from './public/BookingRetry';


function App() {
  return (
    <Store>
      <div className='content'>
        <div className="icm-modal"></div>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/book' element={<MyLayout />}>
            <Route index element={<BookingEntryPoint />} />
            <Route path='chooseRoom' element={<RoomCatalog />} />
            <Route path='orderSummary' element={<RoomSummary />} />
            <Route path='billingInfo' element={<BillingInfo />} />
            <Route path='result' element={<BookingResult />} />
            <Route path='error' element={<BookingError />} />
            <Route path='retry' element={<BookingRetry />} />
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='roomList' element={<RoomList />} />
            <Route path='showRoomDetails' element={<RoomDetails />} />
            <Route path='bookingList' element={<BookingList />} />
            <Route path='booking' element={<Booking />} />
            <Route path='catalog' element={<RoomCatalogAdmin />} />
            <Route path='billingInfo' element={<BillingInfoAdmin />} />
            <Route path='editroominfo' element={<EditRoomInfo />} />
            <Route path='addnewroom' element={<AddNewRoom />} />
            <Route path='settings' element={<AdminLayoutSettings />}>
              <Route index element={<GeneralSettings />} />
              <Route path='general' element={<GeneralSettings />} />
              <Route path='users' element={<Users />} />
              <Route path='roles' element={<Roles />} />
              <Route path='template-roombook-receipt' element={<TemplateRoomBookReceipt />} />
              <Route path='template-roombook-success' element={<TemplateRoomBookSuccess />} />
              <Route path='template-roombook-onhold' element={<TemplateRoomBookOnhold />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/public/about-us' element={<Aboutus />} />
          <Route path='/public/contact-us' element={<Contactus />} />
          <Route path='/public/cancellation-refund-policy' element={<CancellationRefundPolicy />} />
          <Route path='/public/terms-conditions' element={<TermsConditions />} />
          <Route path='/public/room-details' element={<RoomListPublic />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/signin/index' element={<Signin />} />
        </Routes>
      </div>
    </Store>
  );
}
export default App;
