import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Typography,Grid } from '@mui/material';

function Calulator() {

    const [state, setState] = useState({
        numEarly: 8,
        numLate: 3,
        penalty: 20,
        totalFee: 296,
        ballSubsidy: 5,
        totalBall:1,
        priceEarly: 0,
        priceLate: 0,
        priceDonate:0,
    })

    const handleChange = (event) => {
        console.log('handlechange', event.target.name, event.target.value)
        setState({
            ...state,
            [event.target.name]: parseInt(event.target.value)
        })
    }

    useEffect(() => {
        console.log('useEffect acl')
        console.log(state)

        let calPriceEarly = 0.01 + state.totalFee / (state.numEarly + state.numLate) - state.penalty * state.numLate / state.numEarly
        let calPriceLate = 0.01 + state.penalty + (state.totalFee / (state.numEarly + state.numLate)) 

        let calPriceDonate = calPriceEarly >= 0? 0 : calPriceLate * state.numLate - state.totalFee
        let calBallSub = state.totalBall * state.ballSubsidy / (state.numEarly + state.numLate)
        
        
        console.log('calPriceEarly', calPriceEarly, 'calPriceLate' ,calPriceLate)

        setState({...state,
            priceLate: calPriceLate ? calPriceLate: 0,
            priceEarly: calPriceEarly ? (calPriceEarly >= 0 ? calPriceEarly: 0) :0, 
            priceDonate: calPriceDonate
        
    })

    }, [state.numEarly, state.numLate, state.penalty, state.totalFee])

    return (
        <>
            <TextField
                name='numEarly'
                id="outlined-multiline-flexible"
                label="Early"
                type="number"
                
                
                value={state.numEarly}
                onChange={handleChange}
            />
            <TextField
                name='numLate'
                id="outlined-multiline-flexible"
                label="Late"
                type="number"
                
                
                value={state.numLate}
                onChange={handleChange}
            />
            <TextField
                name='penalty'
                id="outlined-multiline-flexible"
                label="Penalty"
                type="number"
                value={state.penalty}
                onChange={handleChange}
            />

            <TextField
                name='totalBall'
                id="outlined-multiline-flexible"
                label="Bring Ball"
                type="number"
                
                
                value={state.totalBall}
                onChange={handleChange}
            />
            <TextField
                name='ballSubsidy'
                id="outlined-multiline-flexible"
                label="Ball Subsidy"
                type="number"
                
                
                value={state.ballSubsidy}
                onChange={handleChange}
            />

            <TextField
                name='totalFee'
                id="outlined-multiline-flexible"
                label="Hire Charges"
                type="number"
                
                
                value={state.totalFee}
                onChange={handleChange}
            />

<Grid
  container
  direction="column"
  //justifyContent="center"
  //alignItems="center"
>
    <Grid>
    <Typography variant="h5">Early Price:</Typography>
    <Typography variant="h3">{state.priceEarly.toFixed(2)}</Typography>
    </Grid>
    <Grid>
    <Typography variant="h5">Late Price:</Typography>
    <Typography variant="h3">{state.priceLate.toFixed(2)}</Typography>
    </Grid>
    <Grid>
    <Typography variant="h5">Donation:</Typography>
    <Typography variant="h3">{state.priceDonate.toFixed(2)}</Typography>
    </Grid>
    </Grid>

            
        </>
    )
}

export default Calulator