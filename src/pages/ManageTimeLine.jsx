import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimelines,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageTimeLine = () => {
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimelines());
    }
  }, [dispatch, loading, error, message]);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center  ">
                <CardTitle className="text-4xl text-blue-600">
                  Manage Your Timeline
                </CardTitle>
                <Link to={"/"}>
                  <Button>Return To Dashboard</Button>
                </Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline && timeline.length > 0 ? (
                      timeline.map((element) => {
                        return (
                          <TableRow key={element._id} className="bg-accent">
                            <TableCell className="font-medium">
                              {element.title}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {element.description}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {element.timeline && element.timeline.from}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {element.timeline && element.timeline.to
                                ? `${element.timeline && element.timeline.to}`
                                : "Present"}
                            </TableCell>
                            <TableCell className="flex justify-end">
                              <button className="border-2 border-red-600 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600">
                                <Trash2
                                  className=" h-5 w-5"
                                  onClick={() =>
                                    handleDeleteTimeline(element._id)
                                  }
                                />
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-3xl font-bold text-center overflow-hidden">
                          You Don&apos;t Have Any Timeline
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ManageTimeLine;
