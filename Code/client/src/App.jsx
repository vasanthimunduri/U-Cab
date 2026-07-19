import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DriverRoute from "./components/DriverRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Uhome from "./pages/Uhome";
import Cabs from "./pages/Cabs";
import BookCab from "./pages/BookCab";
import Mybookings from "./pages/Mybookings";

import Alogin from "./pages/Alogin";
import Aregister from "./pages/Aregister";
import Ahome from "./pages/Ahome";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import Bookings from "./pages/Bookings";
import ManageDrivers from "./pages/ManageDrivers";
import Acabs from "./pages/Acabs";
import Acabedit from "./pages/Acabedit";
import Addcar from "./pages/Addcar";

import DriverLogin from "./pages/DriverLogin";
import DriverRegister from "./pages/DriverRegister";
import DriverDashboard from "./pages/DriverDashboard";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/uhome" element={<ProtectedRoute><Uhome /></ProtectedRoute>} />
          <Route path="/cabs" element={<ProtectedRoute><Cabs /></ProtectedRoute>} />
          <Route path="/bookcab/:id" element={<ProtectedRoute><BookCab /></ProtectedRoute>} />
          <Route path="/mybookings" element={<ProtectedRoute><Mybookings /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/alogin" element={<Alogin />} />
          <Route path="/aregister" element={<Aregister />} />
          <Route path="/ahome" element={<AdminRoute><Ahome /></AdminRoute>} />
          <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
          <Route path="/useredit/:id" element={<AdminRoute><UserEdit /></AdminRoute>} />
          <Route path="/bookings" element={<AdminRoute><Bookings /></AdminRoute>} />
          <Route path="/adrivers" element={<AdminRoute><ManageDrivers /></AdminRoute>} />
          <Route path="/acabs" element={<AdminRoute><Acabs /></AdminRoute>} />
          <Route path="/acabedit/:id" element={<AdminRoute><Acabedit /></AdminRoute>} />
          <Route path="/addcar" element={<AdminRoute><Addcar /></AdminRoute>} />
          
          {/* Driver Routes */}
          <Route path="/dlogin" element={<DriverLogin />} />
          <Route path="/dregister" element={<DriverRegister />} />
          <Route path="/dhome" element={<DriverRoute><DriverDashboard /></DriverRoute>} />
        </Routes>
      </main>
    </>
  );
}
