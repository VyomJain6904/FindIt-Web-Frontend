import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";

export function CustomCheckboxList() {
    const [checked, setChecked] = React.useState<string[]>(["quick"]);
    const { enqueueSnackbar } = useSnackbar();

    const handleToggle = (value: string) => () => {
        let newChecked = [...checked];

        if (value === "quick") {
            if (checked.includes("fullscan")) {
                // Replace 'fullscan' with 'quick'
                newChecked = newChecked.filter((item) => item !== "fullscan");
                newChecked.push("quick");
                enqueueSnackbar(
                    "Only one of Quick or Full Scan can be selected.",
                    {
                        variant: "warning",
                    }
                );
            } else if (checked.includes("quick")) {
                // toggle off
                newChecked = newChecked.filter((item) => item !== "quick");
            } else {
                newChecked.push("quick");
            }
        } else if (value === "fullscan") {
            if (checked.includes("quick")) {
                newChecked = newChecked.filter((item) => item !== "quick");
                newChecked.push("fullscan");
                enqueueSnackbar(
                    "Only one of Quick or Full Scan can be selected.",
                    {
                        variant: "warning",
                    }
                );
            } else if (checked.includes("fullscan")) {
                newChecked = newChecked.filter((item) => item !== "fullscan");
            } else {
                newChecked.push("fullscan");
            }
        } else {
            // Normal toggle for other options
            if (checked.includes(value)) {
                newChecked = newChecked.filter((item) => item !== value);
            } else {
                newChecked.push(value);
            }
        }

        setChecked(newChecked);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "black",
                color: "white",
            }}
        >
            <List
                subheader={
                    <ListSubheader
                        sx={{
                            bgcolor: "black",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "22px",
                        }}
                    >
                        Custom Settings
                    </ListSubheader>
                }
            >
                {[
                    { id: "quick", label: "Quick Scan", icon: "quick.svg" },
                    { id: "fullscan", label: "Full Scan", icon: "full.svg" },
                    { id: "ports", label: "Port Scan", icon: "ports.svg" },
                    {
                        id: "subenum",
                        label: "Sub-Domain Enum",
                        icon: "domain.svg",
                    },
                    { id: "dirbf", label: "Dir Brute-Force", icon: "dir.svg" },
                    {
                        id: "cwordlist",
                        label: "Custom Wordlists",
                        icon: "upload.svg",
                    },
                ].map((item) => (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <img
                                src={`/${item.icon}`}
                                alt={item.label}
                                width={20}
                                height={20}
                            />
                        </ListItemIcon>
                        <ListItemText
                            id={`switch-list-label-${item.id}`}
                            primary={item.label}
                        />
                        <GoldSwitch
                            edge="end"
                            onChange={handleToggle(item.id)}
                            checked={checked.includes(item.id)}
                            inputProps={{
                                "aria-labelledby": `switch-list-label-${item.id}`,
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

const GoldSwitch = styled(Switch)(() => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#FFD700",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#FFD700",
    },
}));
