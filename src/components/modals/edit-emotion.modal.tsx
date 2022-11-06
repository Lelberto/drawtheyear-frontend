import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Emotion } from "../../types/data.types";
import { EmotionBadge } from "../badges/emotion.badge";
import { Button } from "../buttons/button";
import { Modal } from "./modal";

type EditEmotionFormValues = {
    name: string;
    color: string;
};

type EditEmotionModalProps = {
    visible?: boolean;
    emotion?: Emotion;
    onClose: () => void;
    onSave: (emotion: Partial<Emotion>) => void;
};

export const EditEmotionModal = ({
    emotion,
    visible = false,
    onClose,
    onSave,
}: EditEmotionModalProps) => {
    const { register, setValue, handleSubmit } = useForm<EditEmotionFormValues>(
        {
            defaultValues: {
                name: "",
                color: "#000000",
            },
        }
    );

    useEffect(() => {
        setValue("name", emotion?.name);
        setValue("color", emotion?.color);
    }, [emotion]);

    const header = (
        <div className="flex justify-center">
            <h2 className="tracking-[10px] text-gray-200 font-quicksand">
                {emotion ? "Modifier l'émotion" : "Nouvelle émotion"}
            </h2>
        </div>
    );

    const content = (
        <div className="space-y-5 mx-auto flex my-0">
            <div className="flex justify-center ">
                {emotion && <EmotionBadge emotion={emotion} />}
            </div>
            <div className="grid grid-cols-2 w-full h-48 space-x-4">
                <div className="flex flex-col justify-between items-center space-x-2">
                    <label
                        htmlFor="name"
                        className="font-quicksand text-2xl font-semibold"
                    >
                        Nom
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nom de l'émotion"
                        className="border border-b-2 w-3/4 bg-transparent border-l-0 border-t-0 border-r-0 focus:ring-0 focus:border-t-transparent font-quicksand text-xl"
                        {...register("name")}
                    />
                </div>
                <div className="flex flex-col justify-between items-center space-x-2">
                    <label
                        htmlFor="color"
                        className="font-quicksand text-2xl font-semibold"
                    >
                        Couleur
                    </label>
                    <input
                        id="color"
                        type="color"
                        {...register("color")}
                        className="appearance-none w-36 h-36 bg-transparent border-0 active:border-0 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );

    const footer = (
        <div className="flex flex-row items-center justify-center pb-12 pt-4 ">
            <div className="outer button relative bg-dark">
                <Button
                    type="submit"
                    className=" absolute px-8 py-4 font-quicksand font-bold"
                >
                    Enregistrer
                </Button>
                <span></span>
                <span></span>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSave)}>
            <Modal
                header={header}
                content={content}
                footer={footer}
                visible={visible}
                onClose={onClose}
            />
        </form>
    );
};
