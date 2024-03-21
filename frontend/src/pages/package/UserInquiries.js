import React, { useEffect, useState } from "react";
import axios from "axios";
import BannerComponent from "./Banner";
import InquiryBanner from "../../images/inquiryBanner.jpg";
import Giphy from "../../images/giphy.gif";


const UserInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [editData, setEditData] = useState({});
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const userId = localStorage.getItem("username"); // Replace with the actual user ID
      const response = await axios.get(`http://localhost:8080/api/inquiry/inquiries/${userId}`);
      const { data } = response;
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const deleteInquiry = async (inquiryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/inquiry/inquiries/${inquiryId}`);
      fetchInquiries(); // Refresh inquiries after deletion
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const handleEdit = (inquiryId) => {
    const inquiry = inquiries.find((inquiry) => inquiry._id === inquiryId);
    setEditingId(inquiryId);
    setEditData({
      packageId: inquiry.packageId,
      inquiryTitle: inquiry.inquiryTitle,
      inquiryType: inquiry.inquiryType,
      inquiryDescription: inquiry.inquiryDescription,
    });
  };

  const cancelEdit = () => {
    setEditingId("");
    setEditData({});
  };

  const updateInquiry = async (inquiryId) => {
    try {
      await axios.put(`http://localhost:8080/api/inquiry/inquiries/${inquiryId}`, editData);
      fetchInquiries(); // Refresh inquiries after editing
      setEditingId("");
      setEditData({});
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  return (
    <div>
      <BannerComponent heading="Sent Inquiries" banner={InquiryBanner}/>
      <div className="d-flex justify-content-center align-items-center" style={{marginTop:'30px'}}>
        <img src={Giphy} alt="" style={{ width: '50px' }} />
      </div>
      <div className="d-flex justify-content-center m-5">
      {inquiries.length === 0 ? (
        <p>No inquiries sent.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Package Id</th>
              <th>Heading</th>
              <th>Type</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry._id}>
                <td>
                  {editingId === inquiry._id ? (
                    <input
                      type="text"
                      value={editData.packageId}
                      disabled
                    />
                  ) : (
                    inquiry.packageId
                  )}
                </td>
                <td>
                  {editingId === inquiry._id ? (
                    <input
                      type="text"
                      value={editData.inquiryTitle}
                      onChange={(e) => setEditData({ ...editData, inquiryTitle: e.target.value })}
                    />
                  ) : (
                    inquiry.inquiryTitle
                  )}
                </td>

                <td>
                  {editingId === inquiry._id ? (
                    <input
                      type="text"
                      value={editData.inquiryType}
                      onChange={(e) => setEditData({ ...editData, inquiryType: e.target.value })}
                      disabled
                    />
                  ) : (
                    inquiry.inquiryType
                  )}
                </td>
                <td>
                  {editingId === inquiry._id ? (
                    <input
                      type="text"
                      value={editData.inquiryDescription}
                      onChange={(e) => setEditData({ ...editData, inquiryDescription: e.target.value })}
                    />
                  ) : (
                    inquiry.inquiryDescription
                  )}
                </td>
                <td>
                  {inquiry.isResolved ? (
                    <span>Resolved</span>
                  ) : (
                    <span>Not Resolved</span>
                  )}
                </td>
                <td>
                  {editingId === inquiry._id ? (
                    <div class="btn-group">
                      <button class="btn btn-primary" onClick={() => updateInquiry(inquiry._id)}>Save</button>
                      <button class="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div class="btn-group">
                      <button class="btn btn-info" onClick={() => handleEdit(inquiry._id)}>Edit</button>
                      <button class="btn btn-danger" onClick={() => deleteInquiry(inquiry._id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default UserInquiries;

