import { useState } from 'react';
import './ContentFiles.css';

function ContentFiles() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const files = [
    { id: 1, name: 'support_1', type: 'WEBP', date: 'Sep 12', size: '1.82 KB', preview: '🖼️' },
    { id: 2, name: 'support_2', type: 'WEBP', date: 'Sep 12', size: '2.13 KB', preview: '🖼️' },
    { id: 3, name: 'support_3', type: 'WEBP', date: 'Sep 12', size: '1.75 KB', preview: '🖼️' },
    { id: 4, name: 'NYX-1x', type: 'WEBP', date: 'Sep 12', size: '2.31 KB', preview: '🖼️' },
    { id: 5, name: 'plain-smooth-green-wall-texture', type: 'JPG', date: 'Sep 12', size: '9.3 MB', preview: '🖼️' },
    { id: 6, name: 'Gemini_Generated_Image...', type: 'PNG', date: 'Sep 12', size: '937.85 KB', preview: '🎨' },
    { id: 7, name: 'Untitled_design_8', type: 'PNG', date: 'Sep 12', size: '629.94 KB', references: '1 product', preview: '🎨' },
    { id: 8, name: 'Untitled_design_1', type: 'PNG', date: 'Sep 12', size: '509.67 KB', references: '2 references', preview: '🎨' },
  ];

  return (
    <div className="content-files-page">
      <div className="files-content">
        <div className="files-tabs">
          <button className="file-tab active">All</button>
          <button className="file-tab-add">+</button>
        </div>

        <div className="files-table-container">
          <div className="table-toolbar-files">
            <button className="toolbar-icon-btn-files">🔍</button>
            <button className="toolbar-icon-btn-files">☰</button>
            <button className="toolbar-icon-btn-files">↕️</button>
          </div>

          <table className="files-table">
            <thead>
              <tr>
                <th className="checkbox-th">
                  <input type="checkbox" />
                </th>
                <th></th>
                <th>Name</th>
                <th></th>
                <th></th>
                <th>—</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td className="checkbox-td">
                    <input type="checkbox" />
                  </td>
                  <td className="preview-td">
                    <div className="file-preview">{file.preview}</div>
                  </td>
                  <td>
                    <div className="file-info">
                      <div className="file-name">{file.name}</div>
                      <div className="file-type">{file.type}</div>
                    </div>
                  </td>
                  <td className="file-date">{file.date}</td>
                  <td className="file-size">{file.size}</td>
                  <td className="file-references">
                    {file.references || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="files-pagination">
            <button className="pagination-btn">‹</button>
            <span className="pagination-text">1-50</span>
            <button className="pagination-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentFiles;

