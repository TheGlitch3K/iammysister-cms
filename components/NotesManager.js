import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Plus, Save, Trash2, Bell, FileText, X } from 'lucide-react';

const NotesPanel = styled.div`
  background: #F9FAFB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  height: fit-content;
  border: 1px solid #E5E7EB;
`;

const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const AddNoteButton = styled.button`
  padding: 0.5rem;
  background: #14B8A6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    background: #0F766E;
  }
`;

const NotesList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const NoteItem = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }
  
  .note-date {
    font-size: 0.75rem;
    color: #6B7280;
    font-weight: 500;
  }
  
  .note-actions {
    display: flex;
    gap: 0.25rem;
  }
  
  .note-action {
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    
    &:hover {
      color: #EF4444;
      background: #FEE2E2;
    }
  }
  
  .note-content {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }
  
  .reminder-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: #FEF3C7;
    color: #92400E;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const NoteForm = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .form-textarea {
    width: 100%;
    min-height: 80px;
    padding: 0.75rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    resize: vertical;
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: #14B8A6;
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
  }
  
  .form-select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: #14B8A6;
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
  }
  
  .form-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn-save {
    flex: 1;
    padding: 0.5rem;
    background: #14B8A6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    
    &:hover {
      background: #0F766E;
    }
  }
  
  .btn-cancel {
    padding: 0.5rem;
    background: #F3F4F6;
    color: #374151;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover {
      background: #E5E7EB;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6B7280;
  font-size: 0.875rem;
`;

export default function NotesManager({ sisterId, initialNotes = [], onNotesUpdate }) {
  const [notes, setNotes] = useState(initialNotes);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [reminderType, setReminderType] = useState('none');

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now(),
      content: newNote.trim(),
      createdAt: new Date(),
      reminderType,
      reminderDate: reminderType !== 'none' ? 
        new Date(Date.now() + (reminderType === 'tomorrow' ? 24*60*60*1000 : 7*24*60*60*1000)) : 
        null
    };
    
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    setNewNote('');
    setReminderType('none');
    setShowNoteForm(false);
    
    // Notify parent component
    if (onNotesUpdate) {
      onNotesUpdate(sisterId, updatedNotes);
    }
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    if (onNotesUpdate) {
      onNotesUpdate(sisterId, updatedNotes);
    }
  };

  const cancelForm = () => {
    setShowNoteForm(false);
    setNewNote('');
    setReminderType('none');
  };

  return (
    <NotesPanel>
      <NotesHeader>
        <h4>
          <FileText size={16} />
          Admin Notes
        </h4>
        {!showNoteForm && (
          <AddNoteButton onClick={() => setShowNoteForm(true)}>
            <Plus size={14} />
            Add Note
          </AddNoteButton>
        )}
      </NotesHeader>

      {/* Note Form */}
      {showNoteForm && (
        <NoteForm>
          <div className="form-group">
            <label className="form-label">Note Content</label>
            <textarea
              className="form-textarea"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add your note about this sister..."
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Set Reminder</label>
            <select
              className="form-select"
              value={reminderType}
              onChange={(e) => setReminderType(e.target.value)}
            >
              <option value="none">No Reminder</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">Next Week</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button className="btn-save" onClick={addNote}>
              <Save size={14} />
              Save Note
            </button>
            <button className="btn-cancel" onClick={cancelForm}>
              <X size={14} />
              Cancel
            </button>
          </div>
        </NoteForm>
      )}

      {/* Notes List */}
      <NotesList>
        {notes.length === 0 ? (
          <EmptyState>
            No notes yet. Click "Add Note" to create your first admin note.
          </EmptyState>
        ) : (
          notes.map(note => (
            <NoteItem key={note.id}>
              <div className="note-header">
                <span className="note-date">{formatDateTime(note.createdAt)}</span>
                <div className="note-actions">
                  <button className="note-action" onClick={() => deleteNote(note.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="note-content">{note.content}</div>
              {note.reminderDate && (
                <div className="reminder-badge">
                  <Bell size={12} />
                  Reminder: {formatDateTime(note.reminderDate)}
                </div>
              )}
            </NoteItem>
          ))
        )}
      </NotesList>
    </NotesPanel>
  );
}
