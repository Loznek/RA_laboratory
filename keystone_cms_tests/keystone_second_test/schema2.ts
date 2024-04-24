

import {
    text,
    relationship,
    password,
    timestamp,
    select, integer, multiselect,
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';
import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
export const lists2: Lists = {
    Planet: list({

        access: allowAll,

        fields: {
            name: text({
                validation: { isRequired: true },
                isIndexed: 'unique',
            }),
            residents: relationship({ ref: 'Race.planets', many: true }),
            jediFrom: relationship({ ref: 'Jedi.birthPlanet', many: true }),
            surface: select({
                type: 'string',
                options: [
                    { label: 'Desert', value: 'desert' },
                    { label: 'Swampy', value: 'swampy' },
                    { label: 'Aqueous', value: 'aqueous' },
                    { label: 'Gas', value: 'gas' },
                ],
                ui: { displayMode: 'radio' },
            }),

        },



    }),

    Jedi: list({
        access: allowAll,

        fields: {
            name: text({
                validation: { isRequired: true },
                isIndexed: 'unique',
            }),
            birthPlanet: relationship({ ref: 'Planet.jediFrom', many: false }),
            race: relationship({ ref: 'Race', many: true }),
            birthYear: integer({

            }),
            lightSaber: select({
                type: 'string',
                options: [
                    { label: 'Blue', value: 'blue' },
                    { label: 'Green', value: 'green' },
                    { label: 'Purple', value: 'purple' },
                ],
                ui: { displayMode: 'select' },
            }),
        },
    }),

    Race: list({
        access: allowAll,
        fields: {
            name: text({
                validation: { isRequired: true },
                isIndexed: 'unique',
            }),
            origin_planet: relationship({ ref: 'Planet.natives', many: false }),
            occupied_planets: relationship({ ref: 'Planet.residents', many: true })
        },
    }),


    User: list({
        // WARNING
        //   for this starter project, anyone can create, query, update and delete anything
        //   if you want to prevent random people on the internet from accessing your data,
        //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
        access: allowAll,

        // this is the fields for our User list
        fields: {
            // by adding isRequired, we enforce that every User should have a name
            //   if no name is provided, an error will be displayed
            name: text({ validation: { isRequired: true } }),

            email: text({
                validation: { isRequired: true },
                // by adding isIndexed: 'unique', we're saying that no user can have the same
                // email as another user - this may or may not be a good idea for your project
                isIndexed: 'unique',
            }),

            password: password({ validation: { isRequired: true } }),

            // we can use this field to see what Posts this User has authored
            //   more on that in the Post list below

            createdAt: timestamp({
                // this sets the timestamp to Date.now() when the user is first created
                defaultValue: { kind: 'now' },
            }),
        },
    }),

};