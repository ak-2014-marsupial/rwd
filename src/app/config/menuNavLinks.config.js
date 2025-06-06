import {BsFillGearFill, BsListCheck, BsPeopleFill} from "react-icons/bs";
import {GrLanguage} from "react-icons/gr";
import {FontSizeChanger} from "../Components/FontSizeChanger";
import {ThemeSwitcher} from "../Components/ThemeSwitcher";


const useNavLinksConfig = () => {

    const menuItemsConfig = [
        {
            title: "Test speech synthesis",
            icon: BsPeopleFill,
            props: {className: "icon"},
            path: '/test',
            permission: ["admin", "manager"]
        },
        {
            title: "English", children: [
                {title: "Simple text", path: '/english/2/english_2', permission: ["admin", "manager", "user"]},
                {title: "Irregular webs", path: '/english/3/english_2', permission: ["admin", "manager", "user"]},
                {
                    title: "Оваденко", children: [
                        {title: "Lesson 10", path: '/english/4/english_2', permission: ["admin", "manager", "user"]},
                        {title: "Lesson 11", path: '/english/5/english_2', permission: ["admin", "manager", "user"]},
                        {title: "Lesson 12", path: '/english/6/english_2', permission: ["admin", "manager", "user"]},
                        {title: "Lesson 13", path: '/english/7/english_2', permission: ["admin", "manager", "user"]}
                    ]
                }
            ]
        },
        {
            title: "Українська", children: [
                {title: "Наголоси", path: '/english/1/ukrainian', permission: ["admin", "manager", "user"]},
            ]
        },

        // {title: "Text to speech",icon: BsPeopleFill, props: {className: "icon"}, path: '/text_to_speech', permission: ["admin", "manager"]},
        // {title: "Audio Player",icon: BsListCheck, props: {className: "icon"}, path: '/player', permission: ["admin", "manager"]},
        // {title: "TMP",icon: BsListCheck, props: {className: "icon"}, path: '/tmp'},
        // {title: "Speech Recognition",icon: BsPeopleFill, props: {className: "icon"}, path: '/speech'},
        // {title: "Home", path: '/home'},
        // {
        //     title: 'Services', children: [
        //         {title: "Users", icon: BsPeopleFill, props: {className: "icon"},path: "/users", permission: ["admin", "manager", "user"]},
        //         {title: 'web design', cb: (mess) => console.log(mess), permission: ["admin", "manager", "user"]},
        //         {
        //             title: 'web development', children: [
        //                 {title: 'Frontend', cb: (mess) => console.log(mess), permission: ["admin", "manager"]},
        //                 {
        //                     title: 'Backend', permission: ["admin", "manager", "user"], children: [
        //                         {title: 'NodeJS', cb: (mess) => console.log(mess), permission: ["admin", "manager"]},
        //                         {
        //                             title: 'PHP',
        //                             cb: (mess) => console.log(mess),
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //         {title: 'SEO', cb: (mess) => console.log(mess), permission: ["user"]},
        //     ],
        // },
        // {
        //     title: "Auth", children: [
        //         {title: "Login", path: "/login"},
        //         {title: "Register", path: "/register"},
        //         {title: "Log OUT", cb: (mess) => console.log(mess)},
        //         {title: "Get ME", cb: (mess) => console.log(mess)},
        //     ]
        // },
        {
            title: "Settings", icon: BsFillGearFill, props: {className: "icon"}, children: [
                // {
                //     title: "Language",
                //     icon: GrLanguage,
                //     props: {className: "icon"},
                //     children: [
                //         {title: 'En'},
                //         {title: 'Uk'},
                //     ],
                // },
                {
                    component: FontSizeChanger,
                },
                {
                    title: "theme",
                    component: ThemeSwitcher,
                    props: {size: "1.5rem", width: "4rem"}
                },
            ]
        },
        // {
        //     title: "about", children: [
        //         {title: 'Who we are', path: '/about'},
        //         {title: 'Our values', path: "values"},
        //     ],
        // },
    ];

    return menuItemsConfig
}
export {useNavLinksConfig};
