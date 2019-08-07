export default function(state = {}, { type, payload }) {
  switch (type) {
    case 'LOAD_INITIAL_DATA':
      if (payload.currentBook) {
        return payload.currentBook;
      } else {
        return state;
      }
    case 'START_BOOK':
      return payload;
    case 'COMPLETE_BOOK':
      return null;
    default:
      return state;
  }
}
