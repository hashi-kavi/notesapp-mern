import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notes.css';

function Notes() {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const handleTokenExpiration = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes', {
        headers: getAuthHeaders()
      });
      if (response.status === 401) {
        handleTokenExpiration();
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setNotes(data.map(note => ({ ...note, id: note._id, createdAt: new Date(note.createdAt) })));
      } else {
        setError('Failed to fetch notes');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!note.trim()) {
      setError('Note cannot be empty');
      return;
    }
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text: note.trim() })
      });
      if (response.status === 401) {
        handleTokenExpiration();
        return;
      }
      if (response.ok) {
        setNote('');
        setError('');
        fetchNotes();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add note');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.status === 401) {
        handleTokenExpiration();
        return;
      }
      if (response.ok) {
        fetchNotes();
      } else {
        setError('Failed to delete note');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  // Extract nested ternary into independent statement
  const renderNotesContent = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <p>Loading notes...</p>
        </div>
      );
    }
    
    if (notes.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <p>No notes yet. Add your first note above!</p>
        </div>
      );
    }

    return (
      <>
        <div className="notes-stats">
          <span>{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-content">
                <p className="note-text">{note.text}</p>
                <small className="note-time">
                  {note.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </small>
              </div>
              <button 
                onClick={() => handleDelete(note.id)} 
                className="delete-button"
                aria-label="Delete note"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2 className="notes-title">📝 My Notes</h2>
        <p className="notes-subtitle">Keep track of your thoughts</p>
      </div>
      
      <form onSubmit={handleAdd} className="notes-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={note}
            onChange={e => {
              setNote(e.target.value);
              setError('');
            }}
            className={`notes-input ${error ? 'error' : ''}`}
          />
          <button type="submit" className="add-button">
            <span className="button-icon">+</span>
            Add Note
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>

      <div className="notes-list-container">
        {renderNotesContent()}
      </div>
    </div>
  );
}

export default Notes;
