import React from 'react';

const Design = ({ id, rank, title, designer, description, votes, comments, image, onVote, onAddComment }) => {
  const [newComment, setNewComment] = React.useState('');
  const [showComments, setShowComments] = React.useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onAddComment(id, newComment);
    setNewComment('');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const getBadgeColor = (rank) => {
    switch (rank) {
      case '#1':
        return '#ffd700';
      case '#2':
        return '#c0c0c0';
      case '#3':
        return '#cd7f32';
      default:
        return 'transparent';
    }
  };

  const badgeColor = getBadgeColor(rank);

  return (
    <li style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      marginBottom: '20px', 
      borderRadius: '5px', 
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
      display: 'flex', 
      position: 'relative', 
      fontFamily: 'Arial, sans-serif', 
      fontSize: '16px'
    }}>
      {badgeColor !== 'transparent' && (
        <div style={{
        fontSize: '1.5em',
        padding: '5px',
        backgroundColor: badgeColor,
        color: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        textAlign: 'center',
        lineHeight: '30px',
        position: 'absolute',
        top: '10px',
        left: '10px'
}}>
          {rank}
        </div>
      )}
      <div style={{ flex: 1, maxWidth: '250px', marginRight: '20px' }}>
  {image && (
    <img 
      src={image} 
      alt="Design" 
      style={{ 
        width: '200px', 
        height: '200px', 
        objectFit: 'cover', 
        borderRadius: '5px', 
        marginLeft: '70px'
      }} 
    />
  )}
</div>
      <div style={{ flex: 2, marginLeft: '20px' }}>
        <h3 style={{ marginBottom: '10px', color: '#3498db', fontSize: '1.2em' }}> Title :{title}</h3>
        <p style={{ fontStyle: 'italic', marginBottom: '10px', fontSize: '0.9em' }}>By: {designer}</p>
        <p style={{ marginBottom: '10px', fontSize: '1em' }}>{description}</p>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.9em' }}>
          <span style={{ marginRight: '10px',fontSize:'20px' }}>❤️ {votes}</span>
          <button
            onClick={() => onVote(id)}
            style={{fontSize:'20px' , padding: '5px 10px', backgroundColor: 'none', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            👍
          </button>
          <button
            onClick={toggleComments}
            style={{ fontSize:'20px' ,marginLeft: '10px', padding: '5px 10px', backgroundColor: 'none', color: '#3498db', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            💬 {comments.length}
          </button>
        </div>
        {showComments && (
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '1em' }}>💬 Comments:</h4>
             <ul style={{
              listStyle: 'none',
              marginBottom: '10px',
              padding: 0,
              fontSize: '0.9em'
            }}>
              {comments.map((comment, index) => (
                <li key={index} style={{
                  marginBottom: '5px',
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i style={{
                    marginRight: '5px',
                    color: '#3498db'
                  }}>💬</i> {comment}
                </li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', alignItems: 'center', fontSize: '0.9em' }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                required
                style={{ flex: 1, padding: '5px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
              <button
                type="submit"
                style={{ padding: '5px 10px', backgroundColor: '#ff0066', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </li>
  );
};

const DesignSpotlight = ({ designs, onVote, onAddComment }) => {
  const [visibleDesigns, setVisibleDesigns] = React.useState(4); // Set to show 3 top designs + 1 more design initially

  const showMoreDesigns = () => {
    setVisibleDesigns(visibleDesigns + 1); // Increase by 1 design
  };

  const topDesigns = designs.slice(0, 3);
  const otherDesigns = designs.slice(3, visibleDesigns);

  return (
    <section style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2em' }}>Weekly Spotlight</h2>
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.5em' }}>Top 3 Designs</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {topDesigns.map((design, index) => (
            <Design key={design.id} {...design} rank={`#${index + 1}`} onVote={onVote} onAddComment={onAddComment} />
          ))}
        </ul>
      </div>
      <div>
        <h3 style={{ marginBottom: '20px', fontSize: '1.5em' }}>Other Designs</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {otherDesigns.map((design, index) => (
            <Design key={design.id} {...design} rank={`#${index + 4}`} onVote={onVote} onAddComment={onAddComment} />
          ))}
        </ul>
        {designs.length > visibleDesigns && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={showMoreDesigns} style={{ padding: '10px 20px', backgroundColor: '#ff0066', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignSpotlight;
