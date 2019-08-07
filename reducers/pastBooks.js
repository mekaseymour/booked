export default function(state = {}, { type, payload }) {
  switch (type) {
    case 'LOAD_INITIAL_PAST_BOOKS':
      return payload.pastBooks || state;
    default:
      return state;
  }
}
