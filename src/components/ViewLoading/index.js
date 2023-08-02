import {Oval} from 'react-loader-spinner'
import './index.css'

const ViewLoading = () => (
  <div className='loader-container' >
    <Oval
        height={80}
        width={80}
        color="#2a84fa"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#87CEEB"
        strokeWidth={2}
        strokeWidthSecondary={2}
    />
  </div>
)

export default ViewLoading