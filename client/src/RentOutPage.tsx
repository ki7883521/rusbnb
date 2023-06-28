import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import useId from '@mui/material/utils/useId';
import { OutlinedInput } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const MainBox = styled(Box)({
    width: '45vw', marginLeft: '27.5vw', marginTop: '5vh', backgroundColor: 'white', marginBottom: '10vh',
    display: 'flex', flexDirection: 'column',
    gap: '2vh',
    padding: '5vh 2vw', borderRadius: '20px',
    boxShadow: '0px 14px 47px 15px rgba(85, 108, 214, 0.2)',
}),
SelectBox = styled(Box)({
    display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'
})

const blankImage = '/images/blankPhoto.png';
const types = ['Дом','Квартира', 'Вилла', 'Отель'];
const places = ["Алушта","Феодосия","Ялта","Севастополь","Симферополь","Абакан","Адлер","Анапа","Ангарск","Архангельск","Астрахань","Барнаул","Белгород","Благовещенск","Чебоксары","Челябинск","Череповец","Черняховск","Чита","Екатеринбург","Геленджик","Иркутск","Ижевск","Кабардинка","Калининград","Казань","Кемерово","Хабаровск","Ханты-Мансийск","Кисловодск","Комсомольск-на-Амуре","Кострома","Краснодар","Красноярск","Курган","Курск","Липецк","Листвянка","Магадан","Магнитогорск","Махачкала","Минеральные-Воды","Москва","Мурманск","Находка","Нальчик","Нижневартовск","Нижний-Новгород","Ноябрьск","Норильск","Новокузнецк","Новороссийск","Новосибирск","Новый-Уренгой","Омск","Оренбург","Пенза","Пермь","Петропавловск-Камчатский","Петрозаводск","Псков","Пятигорск","Ростов-на-Дону","Рязань","Салехард","Самара","Саранск","Саратов","Саяногорск","Сочи","Санкт-Петербург","Ставрополь","Сургут","Суздаль","Светлогорск","Сыктывкар","Таганрог","Тольятти","Томск","Тула","Тверь","Тюмень","Уфа","Углич","Ухта","Улан-Удэ","Ульяновск","Великий-Новгород","Владикавказ","Владимир","Владивосток","Волгоград","Воркута","Воронеж","Выборг","Якутск","Ярославль","Йошкар-Ола","Южно-Сахалинск","Химки","Калуга","Елабуга","Азов","Александров","Брянск","Вологда","Выкса","Грозный","Иваново","Киров","Муром","Набережные-Челны","Нижнекамск","Переславль-Залесский","Ростов-Великий","Сергиев-Посад","Смоленск","Старая-Русса","Тамбов","Тобольск","Шахты","Стрельна","Петергоф","Пушкин","Обнинск","Армавир","Гатчина","Зеленогорск","Репино","Солнечное","Шлиссельбург","Воскресенское","Коломна","Рождествено","Октябрьский","Всеволожск","Бузулук","Ессентуки","Кировск","Новокуйбышевск","Приозерск","Рыбинск","Серпухов","Стерлитамак","Ступино","Туапсе","Чайковский","Энгельс","Шуя","Сорочинск","Терскол","Кропоткин","Дзержинск","Тихвин","Шатура","Златоуст","Горно-Алтайск","Великие-Луки","Биробиджан","Волгодонск","Волжский","Ейск","Белокуриха","Кирово-Чепецк","Майкоп","Нягань","Саров","Северодвинск","Старый-Оскол","Троицк","Шадринск","Подольск","Дмитров","Дагомыс","Красная-Поляна","Лазаревское","Лоо","Хоста","Зеленоградск","Балашиха","Лысково","Витязево","Вельск","Великий-Устюг","Кингисепп","Звенигород","Северобайкальск","Первоуральск","Ногинск","Электросталь","Тихорецк","Ломоносов","Дубна","Брейтово","Железноводск","Голубицкая","Грязи","Эсто-Садок","Ангелово","Знаменский","Архипо-Осиповка","Горячий-Ключ","Домбай","Животино","Королёв","Курово","Мышкин","Небуг","Никола","Сукко","Шерегеш","Янтарный","Морское","Гурзуф","Евпатория","Керчь","Коктебель","Курпаты","Черноморское(Крым)","Одинцово","Жуковский","Конаково","Петрово-Дальнее","Городец","Иноземцево","Тургояк",
];

export default function RentOutPage(){
    const isLogin = localStorage.getItem('isLogin') || '';
    const [photoList, setPL] = React.useState<Array<File>>([new File([""], '')]);
    const [type, setType] = React.useState('');
    const [subtitle, setSubTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [place, setPlace] = React.useState('');
    const id = useId();
    const handleType = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    const handleCreateRoom = ()=>{
        if(photoList.map(p=>p.name!='').length < 3) {
            toast.error('Минимум 3 фотографии!')
            return
        }
        else if(type=='') {
            toast.error('Необходимо выбрать тип жилья')
            return
        }
        else if(place=='') {
            toast.error('Необходимо выбрать место')
            return
        }
        else if(price <= 0) {
            toast.error('Цена не может быть <= 0')
            return
        }
        else
        handlePostRoom();
    }

    const handlePostPhotos = ()=>{
        axios.get('/rooms'
        )
        .then(res=>{
                const rooms = res.data.rooms;
                let roomId = rooms[rooms.length - 1].id;
                photoList.forEach(p=>{
                    const bodyFormData = new FormData();
                    bodyFormData.append('photo', p);
                    bodyFormData.append('title', 'none');
                    bodyFormData.append('description', 'none');
                    axios.post(`/rooms/${roomId}/photo`, {
                        headers: {'Content-Type': 'multipart/form-data'},
                        data: bodyFormData
                    })
                    .then(res=>{
                        toast.success('Фотографии загружены');
                        window.location.href="/";
                        })
                    .catch((error) => {
                        toast.error(`Ошибка на сервере. `+error);
                    });
                })
            })
        .catch((error) => {
            toast.error(`Ошибка на сервере. `+error);
            });
    }
    const handlePostRoom = ()=>{
        axios.post('/rooms',{
            title: `${type}, ${place}`,
            subtitle: subtitle,
            description: desc,
            price: price,
            rate: 0
        })
        .then(res=>{
            toast.success('Жилье создано');
            handlePostPhotos();
            })
        .catch((error) => {
            if(!error.response) toast.error('Ошибка на сервере. '+error)
            else if (error.response!.status === 400){
                toast.error(`Один или несколько полей не заданы`);
            }
            else{
                toast.error('Ошибка на сервере. '+error)
            }
            });
    }
    return (
    <MainBox>
            {!(isLogin==='true')?

            (
                <Typography sx={{color: 'red', fontSize: '2rem'}}>Необходимо войти в аккаунт!</Typography>
            ):

            (<>
            <SelectBox>
                <FormControl sx={{ width: '45%', height: '5vh'}}  variant="filled" size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">Тип жилья</InputLabel>
                    <Select sx={{height: '100%'}}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={type}
                    onChange={handleType}
                    autoWidth
                    label="Тип жилья"
                    >
                    {
                        types.map((it) => (
                            <MenuItem value={it} key={it}>{it}</MenuItem>
                        ))
                    }
                    </Select>
                    </FormControl>
                <Autocomplete
                    
                    onChange={(e, v)=>{setPlace(String(v))}}
                    id="combo-box-demo"
                    options={places}
                    sx={{ width: '45%' }}
                    renderInput={(params) => <TextField {...params} label="Место" variant='filled'
                    sx={{ width: '100%', height: '100%'}} size="small"/>}
                />
            </SelectBox>
            <OutlinedInput placeholder='Краткое описание' onChange={(e)=>{setSubTitle(e.target.value)}}></OutlinedInput>
            <OutlinedInput placeholder='Описание' onChange={(e)=>{setDesc(e.target.value)}}></OutlinedInput>
            <OutlinedInput placeholder='Цена за ночь, &#8381;'
            type="number" onChange={(e)=>{setPrice(parseInt(e.target.value))}}></OutlinedInput>
            <Typography sx={{fontWeight: 'bold'}}>Фотографии (минимум 3)</Typography>
        {
            photoList.map((file, i) =>
        (
            <Box>
                <Button
                    variant="contained"
                    component="label"
                    key={`${id}-${i}`}
                    >
                    {file.name==""?"Файл не выбран":file.name}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e)=>{
                                setPL(photoList.map((item, index)=>(
                                index == i?(e.target.files?e.target.files[0]:(new File([""], ''))):item
                            )));
                        }}
                        />
                </Button>
                <Button onClick={()=>{
                    if(photoList.length > 1)
                    setPL(photoList.filter((_, index)=>index!=i));
                }}>&#10006;</Button>
        </Box>))
        }
        <Button sx={{width: '50%'}} onClick={()=>{setPL([...photoList, (new File([""], ''))]);}}>Добавить ещё</Button>
        <Button onClick={handleCreateRoom} variant="contained">Сдать</Button>
        </>
        )
}
    </MainBox>
    )
}