import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

const dateFormat = 'DD/MM/YYYY';

function onChange(date, dateString) {
    console.log(date, dateString);
}

function DateRenderer(props) {
    return (
        <Space direction="vertical">
            <DatePicker format={dateFormat} onChange={onChange} />
        </Space>
    )
}

export default DateRenderer;