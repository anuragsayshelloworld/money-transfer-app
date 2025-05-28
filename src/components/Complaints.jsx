import { useEffect, useState } from 'react';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('complaints')) || [];

    if (stored.length === 0 && !localStorage.getItem('dummyComplaintAdded')) {
      const dummy = [{
        id: 'dummy-1',
        name: 'John Doe',
        phonenumber: '1234567890',
        text: 'This is a dummy complaint for demonstration.',
        date: new Date().toISOString(),
      }];
      setComplaints(dummy);
      localStorage.setItem('complaints', JSON.stringify(dummy));
      localStorage.setItem('dummyComplaintAdded', 'true');
    } else {
      setComplaints(stored);
    }
  }, []);

  const askResolve = (complaint) => {
    setSelectedComplaint(complaint);
    setShowConfirm(true);
  };

  const confirmResolve = () => {
    if (!selectedComplaint) return;
    const updated = complaints.filter(c => c.id !== selectedComplaint.id);
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    setSelectedComplaint(null);
    setShowConfirm(false);
  };

  const cancelResolve = () => {
    setSelectedComplaint(null);
    setShowConfirm(false);
  };

  const sortedComplaints = [...complaints].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h4 className="mb-4">User Complaints</h4>

      {sortedComplaints.length === 0 ? (
        <p className="text-muted">No complaints found.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {sortedComplaints.map(({ id, name, phonenumber, text, date }) => (
            <div key={id} className="card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title mb-1">{name} <small className="text-muted">({phonenumber})</small></h6>
                  <p className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.85rem' }}>
                    {new Date(date).toLocaleString()}
                  </p>
                  <p className="card-text">{text}</p>
                </div>
                <button
                  className="btn btn-outline-success btn-sm align-self-start"
                  onClick={() => askResolve({ id, name, text, phonenumber })}
                  aria-label={`Mark complaint from ${name} as resolved`}
                  title="Resolve complaint"
                >
                  <span role="img" aria-hidden="true">✅</span> Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && selectedComplaint && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmResolveTitle"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmResolveTitle">Confirm Resolve</h5>
                <button type="button" className="btn-close" onClick={cancelResolve}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to mark this complaint as resolved?</p>
                <p>
                  <strong>Phone:</strong> {selectedComplaint.phonenumber} <br />
                  <strong>Complaint:</strong> {selectedComplaint.text}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelResolve}>Cancel</button>
                <button className="btn btn-success" onClick={confirmResolve}>Yes, Resolve</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
