import {web} from "./src/application/web.js";
import { logger } from "./src/application/logging.js";

web.listen(3000, () => {
    logger.info('Server is listening on port 3000');
});