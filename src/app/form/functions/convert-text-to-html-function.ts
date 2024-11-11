export const convertTextToHtml = (text: string = ''): string => {
    const regex = /(https?:\/\/\S+)/g;
    return text.replace(regex, (match: any) => {
        const lastChar = match[match.length - 1];
        if (/[)\(!\.]/.test(lastChar)) {
            return `<a href="${match.slice(0, -1)}" target="_blank">${match.slice(0, -1)}</a>`;
        }
        return `<a href="${match}" target="_blank">${match}</a>`;
    });
}
