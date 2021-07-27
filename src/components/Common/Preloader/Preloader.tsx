import preloader from '../../../assets/images/preloader.svg';

let Preloader = () => (
    <div style={{ width: '150px', height: '150px', alignSelf: 'center' }}>
        <img src={preloader} alt='img' />
    </div>
);

export default Preloader;
