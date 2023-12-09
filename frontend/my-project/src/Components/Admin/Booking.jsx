import React, { useState,useContext,useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from "axios";
const Bookings_admin = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [bookings, setBookings] = useState({ pending: [], approved: [] });
  const { _id: userId } = useContext(AuthContext)
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState({});
  const [editedPaymentStatus, setEditedPaymentStatus] = useState({});


  const fetchBookingsAndRoutes = async () => {
    try {
      // Fetch bookings for the user
      const bookingResponse = await axios.get(`http://localhost:3000/users/userbookings`);
      const userBookings = bookingResponse.data;

      // Fetch route details for each booking
      const routesResponse = await Promise.all(userBookings.map(booking => 
        axios.get(`http://localhost:3000/users/routesforbookings/${booking.route_id}`)
      ));
      const routeDetails = routesResponse.map(response => response.data);

      // Combine bookings with their route details
      const combinedBookings = userBookings.map((booking, index) => ({
        ...booking,
        route: routeDetails[index]
      }));

      // Separate bookings into pending and approved
      const pendingBookings = combinedBookings.filter(booking => booking.status === 'pending');
      const approvedBookings = combinedBookings.filter(booking => booking.status === 'approved');
      setBookings({ pending: pendingBookings, approved: approvedBookings });
    } catch (error) {
      console.error("Error fetching bookings and routes:", error);
    }
  };
  useEffect(() => {
    

    if (userId) {
      fetchBookingsAndRoutes();
    }
  }, [userId]);

  const handleEditBooking = async (bookingId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/editbooking/${bookingId}`, updatedData);
      setEditingBookingId(null); 
      fetchBookingsAndRoutes();
      alert('Booking successfully edited.'); 
    } catch (error) {
      console.error("Error updating booking:", error);
      alert('Failed to edit booking.'); 
    }
  };
  
  
  
  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:3000/users/deletebooking/${bookingId}`);
        fetchBookingsAndRoutes();
        alert('Booking successfully deleted.'); 
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert('Failed to delete booking.');
      }
    }
  };
  
  
  

  // Styles
  const styles = {
    editButton: {
        padding: '5px 10px',
        marginRight: '5px',
        backgroundColor: '#f0ad4e', // Bootstrap's btn-warning color
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    
      saveButton: {
        padding: '5px 10px',
        backgroundColor: '#5cb85c', // Bootstrap's btn-success color
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    
      deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#d9534f', // Bootstrap's btn-danger color
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    
      // Hover effects
      buttonHover: {
        opacity: 0.8,
      },
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    tabSelector: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    tabButton: {
      padding: '10px 20px',
      margin: '0 10px',
      border: 'none',
      borderRadius: '20px',
      background: '#ddd',
      color: '#333',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    activeTabButton: {
      background: '#007bff',
      color: '#fff',
    },
    table: {
      width: '100%',
      marginTop: '20px',
      borderCollapse: 'collapse',
    },
    th: {
      background: '#007bff',
      color: '#fff',
      padding: '10px',
      border: '1px solid #ddd',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'center',
    },
    statusPending: {
      color: '#e67e22',
      fontWeight: 'bold',
    },
    statusApproved: {
      color: '#27ae60',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabSelector}>
        <button
          style={activeTab === 'pending' ? { ...styles.tabButton, ...styles.activeTabButton } : styles.tabButton}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          style={activeTab === 'approved' ? { ...styles.tabButton, ...styles.activeTabButton } : styles.tabButton}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Booking ID</th>
            <th style={styles.th}>Pickup Location</th>
            <th style={styles.th}>Destination</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Fare</th>
            {activeTab === 'approved' && <th style={styles.th}>Payment Status</th>}
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings[activeTab].map((booking) => (
            <tr key={booking._id}>
              <td style={styles.td}>{booking._id}</td>
              <td style={styles.td}>{booking.route.from}</td>
              <td style={styles.td}>{booking.route.to}</td>
              <td style={styles.td}>{new Date(booking.date).toLocaleDateString()}</td>
              <td style={styles.td}>{new Date(booking.date).toLocaleTimeString()}</td>
              <td style={styles.td}>${booking.route.fare}</td>
              {activeTab === 'approved' && (
                <td style={styles.td}>
                  {editingBookingId === booking._id ? (
                    <select defaultValue={booking.payment_status} onChange={(e) => setEditedPaymentStatus({ ...editedPaymentStatus, [booking._id]: e.target.value })}>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                  
                  ) : (
                    booking.payment_status
                  )}
                </td>
              )}
              <td style={styles.td}>
                {editingBookingId === booking._id ? (
                 <select defaultValue={booking.status} onChange={(e) => setEditedStatus({ ...editedStatus, [booking._id]: e.target.value })}>
                 <option value="pending">Pending</option>
                 <option value="approved">Approved</option>
               </select>
               
                ) : (
                  <span style={booking.status === 'pending' ? styles.statusPending : styles.statusApproved}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                )}
              </td>
              <td style={styles.td}>
                {editingBookingId === booking._id ? (
                 <button style={{ ...styles.saveButton, ...styles.buttonHover }} onClick={() => handleEditBooking(booking._id, { status: editedStatus[booking._id], payment_status: editedPaymentStatus[booking._id] })}>Save</button>

                ) : (
                  <button style={{ ...styles.editButton, ...styles.buttonHover }}  onClick={() => setEditingBookingId(booking._id)}>Edit</button>
                )}
                <button style={{ ...styles.deleteButton, ...styles.buttonHover }} onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
          };
  

export default Bookings_admin;