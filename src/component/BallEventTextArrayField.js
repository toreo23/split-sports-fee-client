import Chip from '@mui/material/Chip';

const BallEventTextArrayField = ({ record, source }) => {
    console.log('record', record, 'source', source)
  const array = record[source]
  if (typeof array === 'undefined' || array === null || array.length === 0) {
    return <div/>
  } else {
    return (
      <>
        {array.map(item => <Chip label={item} key={item}/>)}
      </>
    )    
  }
}
BallEventTextArrayField.defaultProps = { addLabel: true }

export default BallEventTextArrayField