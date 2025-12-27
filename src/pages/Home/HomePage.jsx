import { tools } from '../../data/tools';
import ToolsGrid from './ToolsGrid';

const HomePage = () => {
    return (
        <div>
            <ToolsGrid tools={tools} />
        </div>
    );
};

export default HomePage;
