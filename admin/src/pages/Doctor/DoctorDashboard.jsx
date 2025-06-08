import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  // Handle email sending via backend API
  const handleSendMail = async (to, subject, message) => {
    try {
      console.log("Hi");
      await axios.post('http://localhost:4000/api/send-email', { to, subject, message });
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  // Fetch dashboard data on token change
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="m-5">
      {/* Summary Stats */}
      <div className="flex flex-wrap gap-3">
        {/* Earnings */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{currency} {dashData.earnings}</p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>
        {/* Appointments */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>
        {/* Patients */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-10 border rounded">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="Bookings" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
              <img className="rounded-full w-10 h-10 object-cover" src={item.userData.image} alt="User" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.userData.name}</p>
                <p className="text-gray-600">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex gap-2">
                  {/* Cancel */}
                  <img
                    onClick={() => {
                      cancelAppointment(item._id);
                      handleSendMail(
                        item.userData.email,
                        'Appointment Cancelled',
                        `Dear ${item.userData.name}, your appointment on ${slotDateFormat(item.slotDate)} has been cancelled.`
                      );
                    }}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title="Cancel Appointment"
                  />
                  {/* Complete */}
                  <img
                    onClick={() => {
                      completeAppointment(item._id);
                      handleSendMail(
                        item.userData.email,
                        'Appointment Confirmed',
                        `Dear ${item.userData.name}, your appointment on ${slotDateFormat(item.slotDate)} has been confirmed.`
                      );
                    }}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt="Confirm"
                    title="Complete Appointment"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

