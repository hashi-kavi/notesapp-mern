import React, { useState } from 'react';

function Notes() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!note) {
      setError('Note cannot be empty');
      return;
    }
    setNotes([...notes, note]);
    setNote('');
    setError('');
  };

  const handleDelete = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Notes</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add a note"
          value={note}
          onChange={e => setNote(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
        />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" style={{ width: '100%' }}>Add Note</button>
      </form>
      <ul style={{ padding: 0 }}>
        {notes.map((n, idx) => (
          <li key={idx} style={{ listStyle: 'none', margin: '8px 0', background: '#f9f9f9', padding: '8px', borderRadius: 4 }}>
            {n}
            <button onClick={() => handleDelete(idx)} style={{ float: 'right' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;