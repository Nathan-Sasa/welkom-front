import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const WelkomPreset = definePreset(Aura, {
    primitive: {
        welkom: {
            50: '#FFF5F1',
            100: '#FDE9E3',
            200: '#FAD1C7',
            300: '#F5B3A5',
            400: '#EC947F',
            500: '#D9775F',
            600: '#C96852',
            700: '#B85C49',
            800: '#984B3C',
            900: '#7D3E33',
            950: '#43201B',
        },
        sage: {
            50: '#F5F7F3',
            100: '#E9EEE6',
            200: '#D7DFD2',
            300: '#C4CEBE',
            400: '#B4C0AB',
            500: '#A8B5A0',
            600: '#91A188',
            700: '#7C8D73',
            800: '#65745E',
            900: '#4E5A49',
            950: '#293027',
        },
        gold: {
            50: '#FBF7ED',
            100: '#F6EEDC',
            200: '#EEDDB9',
            300: '#E4CA94',
            400: '#D8B97A',
            500: '#C9A86A',
            600: '#B39458',
            700: '#927744',
            800: '#725D36',
            900: '#5A492B',
            950: '#302719',
        },
        warning: {
            50: '#FBF7ED',
            100: '#F6EEDC',
            200: '#EEDDB9',
            300: '#E4CA94',
            400: '#D8B97A',
            500: '#D49A4A', //
            600: '#B39458',
            700: '#927744',
            800: '#725D36',
            900: '#5A492B',
            950: '#302719',
        },
        dangers: {
            50: '#FBF7ED',
            100: '#F6EEDC',
            200: '#EEDDB9',
            300: '#E4CA94',
            400: '#D8B97A',
            500: '#C75C5C', //
            600: '#B39458',
            700: '#927744',
            800: '#725D36',
            900: '#5A492B',
            950: '#302719',
        }
    },
    semantic: {
        primary: {
            50: '{welkom.50}',
            100: '{welkom.100}',
            200: '{welkom.200}',
            300: '{welkom.300}',
            400: '{welkom.400}',
            500: '{welkom.500}',
            600: '{welkom.600}',
            700: '{welkom.700}',
            800: '{welkom.800}',
            900: '{welkom.900}',
            950: '{welkom.950}',
        },
        secondary: {
            50: '{sage.50}',
            100: '{sage.100}',
            200: '{sage.200}',
            300: '{sage.300}',
            400: '{sage.400}',
            500: '{sage.500}',
            600: '{sage.600}',
            700: '{sage.700}',
            800: '{sage.800}',
            900: '{sage.900}',
            950: '{sage.950}',
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#FFFFFF',
                    50: '#FAF7F2',
                    100: '#F6F1EA',
                    200: '#F0E9E1',
                    300: '#E8E0D8',
                    400: '#D9D0C8',
                    500: '#C8BDB4',
                    600: '#AFA39A',
                    700: '#948A83',
                    800: '#6B625D',
                    900: '#443E3A',
                    950: '#292524',
                },
                primary: {
                    color: '{welkom.500}',
                    contrastColor: '#FFFFFF',
                    hoverColor: '{welkom.600}',
                    activeColor: '{welkom.700}',
                },
                highlight: {
                    background: '{welkom.50}',
                    focusBackground: '{welkom.100}',
                    color: '{welkom.800}',
                    focusColor: '{welkom.900}',
                },
                formField: {
                    background: '#FFFFFF',
                    disabledBackground: '#F6F1EA',
                    borderColor: '#E8E0D8',
                    hoverBorderColor: '{sage.300}',
                    focusBorderColor: '{sage.500}',
                    color: '#292524',
                    disabledColor: '#948A83',
                    placeholderColor: '#948A83',
                    borderRadius: '8px',
                    focusRing: {
                        width: '2px',
                        style: 'solid',
                        color: '{welkom.100}',
                        offset: '1px',
                        shadow: 'none',
                    },
                },
                text: {
                    color: '#292524',
                    hoverColor: '#292524',
                },
                content: {
                    background: '#FFFFFF',
                    hoverBackground: '#F6F1EA',
                    borderColor: '#E8E0D8',
                    color: '#292524',
                },
            },
            dark: {
                surface: {
                    0: '#FFFFFF',
                    50: '#F7F2EC',
                    100: '#E8DED5',
                    200: '#C8BFB7',
                    300: '#A99F97',
                    400: '#938981',
                    500: '#746B64',
                    600: '#5A524D',
                    700: '#443D38',
                    800: '#332D29',
                    900: '#211D1A',
                    950: '#171412',
                },
                primary: {
                    color: '{welkom.400}',
                    contrastColor: '#291813',
                    hoverColor: '{welkom.300}',
                    activeColor: '{welkom.200}',
                },
                highlight: {
                    background: '#43201B',
                    focusBackground: '#5A2A22',
                    color: '#FDE9E3',
                    focusColor: '#FFFFFF',
                },
                formField: {
                    background: '#211D1A',
                    disabledBackground: '#29231F',
                    borderColor: '#3A322D',
                    hoverBorderColor: '{sage.700}',
                    focusBorderColor: '{sage.500}',
                    color: '#F7F2EC',
                    disabledColor: '#938981',
                    placeholderColor: '#938981',
                    borderRadius: '6px',
                    focusRing: {
                        width: '2px',
                        style: 'solid',
                        color:   '{sage.900}',//'#6E4035',
                        offset: '1px',
                        shadow: 'none',
                    },
                },
                text: {
                    color: '#F7F2EC',
                    hoverColor: '#FFFFFF',
                },
                content: {
                    background: '#211D1A',
                    hoverBackground: '#29231F',
                    borderColor: '#3A322D',
                    color: '#F7F2EC',
                },
            },
        },
    },
    components: {
        button: {
            colorScheme: {
                light: {
                    text: {
                        success: {
                            color: '{sage.600}',
                            hoverBackground: '{sage.50}',
                            activeBackground: '{sage.100}',
                        },
                        warn: {
                            color: '{gold.600}',
                            hoverBackground: '{gold.50}',
                            activeBackground: '{gold.100}',
                        },
                        danger: {
                            color: '{dangers.500}',
                        }
                    },
                    outlined: {
                        success: {
                            color: '{sage.600}',
                            borderColor: '{sage.600}',
                            hoverBackground: '{sage.50}',
                            activeBackground: '{sage.100}',
                        },
                        // info: {
                        //     color: '{warning.500}',
                        //     borderColor: '{waring.500}',
                        //     hoverBackground: '{gold.50}',
                        //     activeBackground: '{gold.100}',
                        // },
                        danger: {
                            color: '{dangers.500}',
                            borderColor: '{dangers.500}',
                            hoverBackground: '{primary.50}',
                            activeBackground: '{primary.100}',
                        }
                    },
                    root: {
                        borderRadius: '8px',
                        success: {
                            background: '{sage.600}',
                            borderColor: '{sage.600}',
                            hoverBackground: '{sage.700}',
                            hoverBorderColor: '{sage.700}',
                            activeBackground: '{sage.800}',
                            activeBorderColor: '{sage.800}',
                        },
                        warn: {
                            background: '{warning.500}',
                            borderColor: '{warning.500}',
                            hoverBackground: '{gold.500}',
                            hoverBorderColor: '{gold.500}',
                            activeBackground: '{gold.600}',
                            activeBorderColor: '{gold.600}',
                        },
                        danger: {
                            background: '{dangers.500}',
                            borderColor: '{dangers.500}',
                            hoverBackground: '{gold.700}',
                            hoverBorderColor: '{gold.700}',
                            activeBackground: '{gold.800}',
                            activeBorderColor: '{gold.800}',
                        },
                        // info: {
                        //     background: '{gold.600}',
                        //     borderColor: '{gold.600}',
                        //     hoverBackground: '{gold.700}',
                        //     hoverBorderColor: '{gold.700}',
                        //     activeBackground: '{gold.800}',
                        //     activeBorderColor: '{gold.800}',
                        // }
                    }
                },
                dark: {
                    text: {
                        success: {
                            color: '{sage.600}',
                            hoverBackground: '{sage.950}',
                            activeBackground: '{sage.900}',
                        },
                        warn: {
                            color: '{gold.600}',
                            hoverBackground: '{gold.950}',
                            activeBackground: '{gold.900}',
                        },
                        danger: {
                            color: '{dangers.500}',
                        }
                    },
                    outlined: {
                        success: {
                            color: '{sage.600}',
                            borderColor: '{sage.600}',
                            hoverBackground: '{sage.950}',
                            activeBackground: '{sage.900}',
                        },
                        // info: {
                        //     color: '{warning.500}',
                        //     borderColor: '{waring.500}',
                        //     hoverBackground: '{gold.950}',
                        //     activeBackground: '{gold.900}',
                        // },
                        danger: {
                            color: '{dangers.500}',
                            borderColor: '{dangers.500}',
                            hoverBackground: '{primary.950}',
                            activeBackground: '{primary.900}',
                        }
                    },
                    root: {
                        borderRadius: '8px',
                        primary: {
                            color: '#F7F2EC',
                            hoverColor: '#F7F2EC',
                            activeColor: '#F7F2EC',
                            background: '{welkom.600}',
                            borderColor: '{welkom.600}',
                            hoverBackground: '{welkom.700}',
                            hoverBorderColor: '{welkom.700}',
                            activeBackground: '{welkom.800}',
                            activeBorderColor: '{welkom.800}',
                        },
                        success: {
                            color: '#F7F2EC',
                            hoverColor: '#F7F2EC',
                            activeColor: '#F7F2EC',
                            background: '{sage.700}',
                            borderColor: '{sage.700}',
                            hoverBackground: '{sage.800}',
                            hoverBorderColor: '{sage.800}',
                            activeBackground: '{sage.900}',
                            activeBorderColor: '{sage.900}',
                        },
                        warn: {
                            color: '#F7F2EC',
                            hoverColor: '#F7F2EC',
                            activeColor: '#F7F2EC',
                            background: '{warning.500}',
                            borderColor: '{warning.500}',
                            hoverBackground: '{gold.500}',
                            hoverBorderColor: '{gold.500}',
                            activeBackground: '{gold.600}',
                            activeBorderColor: '{gold.600}',
                        },
                        danger: {
                            color: '#F7F2EC',
                            hoverColor: '#F7F2EC',
                            activeColor: '#F7F2EC',
                            background: '{dangers.500}',
                            borderColor: '{dangers.500}',
                            hoverBackground: '{gold.700}',
                            hoverBorderColor: '{gold.700}',
                            activeBackground: '{gold.800}',
                            activeBorderColor: '{gold.800}',
                        },
                        // info: {
                        //     color: '#F7F2EC',
                        //     hoverColor: '#F7F2EC',
                        //     activeColor: '#F7F2EC',
                        //     background: '{gold.600}',
                        //     borderColor: '{gold.600}',
                        //     hoverBackground: '{gold.700}',
                        //     hoverBorderColor: '{gold.700}',
                        //     activeBackground: '{gold.800}',
                        //     activeBorderColor: '{gold.800}',
                        // }
                    }
                }

            }
        },
        card: {
            colorScheme: {
                light: {
                    root: {
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        color: '#292524',
                        shadow: 'none',
                    }
                },
                dark: {
                    root: {
                        background: '#211D1A',
                        borderRadius: '16px',
                        color: '#F7F2EC',
                        shadow: 'none',
                    }
                }
            }
        },
        progressspinner: {
            colorScheme: {
                light: {
                    root: {
                        colorOne: '{primary.500}',
                        colorTwo: '{primary.500}',
                        colorThree: '{primary.200}',
                        colorFour: '{primary.200}',
                    }
                },
                dark: {
                    root: {
                        colorOne: '{primary.400}',
                        colorTwo: '{primary.400}',
                        colorThree: '{primary.200}',
                        colorFour: '{primary.200}',
                    }
                }
            }
        },
        badge: {
            colorScheme: {
                light: {
                    danger: {
                        background: '{primary.500}'
                    },
                    success: {
                        background: '{sage.500}'
                    },
                    warn: {
                        background: '{gold.500}'
                    },
                    root: {
                        borderRadius: '12px',
                        minWidth: 'fit'
                    }
                },
                dark: {
                    danger : {
                        color: '#F7F2EC',
                        background: '{primary.600}'
                    },
                    success: {
                        color: '#F7F2EC',
                        background: '{sage.700}'
                    },
                    warn: {
                        color: '#F7F2EC',
                        background: '{gold.600}'
                    }
                }
            }
        },
        toast: {
            colorScheme: {
                light: {
                    success: {
                        background: '{surface.500}',
                        color: '{sage.500}',
                        closeButton: {
                            hoverBackground: 'transparent',
                            focusRing: {
                                color: '{sage.600}',
                                shadow: 'none'
                            }
                        }
                    },
                    summary: {
                        fontWeight: '600'
                    }
                },
                dark: {
                    success: {
                        background: '{surface.500}',
                        color: '{sage.500}',
                        closeButton: {
                            hoverBackground: 'transparent',
                            focusRing: {
                                color: '{sage.600}',
                                shadow: 'none'
                            }
                        }
                    },
                    summary: {
                        fontWeight: '600'
                    }
                }
            }
        }
    }
});
