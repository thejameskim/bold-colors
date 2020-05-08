import React from 'react';

// This type makes it easier to declare the type for a state setter from React.useState
export type ReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;