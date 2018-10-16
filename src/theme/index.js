import { theme } from 'quant-ui';
switch (theme.getCurrentColor()) {
    case "default":
        break;
    case "red":
        import('./red.less')
        break;
    case "green":
        import('./green.less');
        break;
    case "purple":
        import('./purple.less');
        break;
    default:
        break;
}