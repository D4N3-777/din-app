import { Expose, Transform, Type } from "class-transformer";
import moment, { Moment } from "moment";
import { Movie } from "../Movies";
import { TvShow } from "../TvShow";

export class Queue {
    public id: number;
    public title: string;
    public size: number;
    @Expose({ name: "size_left" })
    public sizeLeft: number;
    @Expose({ name: "time_left" })
    public timeLeft: number;
    @Transform((value) => moment(value))
    @Type(() => Date)
    public eta: Moment;
    public status: string;
    @Expose({ name: "download_id" })
    public downloadId: string;
    public protocol: string;
    @Type(() => Movie)
    public movie: Movie;
    @Type(() => TvShow)
    @Expose({ name: "tv_show" })
    public tvShow: TvShow
}
